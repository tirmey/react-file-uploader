//core
import React, { Component } from 'react';

//components
import FilesList from './FilesList';
import FileUploaderBar from './FileUploaderBar';
import FileUploaderAddBtn from './FileUploaderAddBtn';
//utils
//import {meyer_showMessage, meyer_visibility, classToggler} from './../scripts/meyer';

class FileUploader extends Component {
  state = {
    filesIDs: [],
    uploadSize: 0,
    fileMaxSize: 0,
		uploadMaxSize: 0,
		multipleFiles: true,
		uploadSizeBar: true
  }  

	componentWillMount() {	
		console.log('>>>>>> chegou aqui');	
		if (!this.props.multipleFiles) {
			this.setState(() => ({
				multipleFiles: false, 
				filesIDs: [0], 
				fileMaxSize: this.props.fileMaxSize,
				uploadMaxSize: this.props.fileMaxSize
			}));
		}  else {
			this.setState(() => ({uploadMaxSize: this.props.uploadMaxSize, fileMaxSize: this.props.fileMaxSize}))
		}
		if (!this.props.uploadSizeBar) {
			this.setState(() => ({uploadSizeBar: false}));
		}
	}

  insertNewFileHandler = () => {     
		let id = this.state.filesIDs.length !== 0 ? this.state.filesIDs[0] + 1 : 0;
		if (id === 0 || (id > 0 && document.getElementById(`attach-${id -1}`).value)) {
			this.setState((prevState) => ({filesIDs: [id, ...prevState.filesIDs ]}));
		}
	}
	
	uploadBarHandler = (fileSize) => {
		const maxSize = this.state.uploadMaxSize;
		let barFill;
		barFill = document.querySelector(`.file-uploader-bar__fill`) ? document.querySelector(`.file-uploader-bar__fill`) : '';
		if (barFill) {
			barFill.style.width = `${fileSize*100/maxSize}%`;
			if (fileSize < maxSize/2) {
				barFill.style.backgroundColor = '#116466'
			} else if (fileSize >= maxSize/2 && fileSize < maxSize * 0.85) {
				barFill.style.backgroundColor = '#d04816';
			} else if (fileSize >= maxSize * 0.85) {
				barFill.style.backgroundColor = '#be1717';        
			}
			document.querySelector(`.file-uploader-bar__text`).innerHTML = `${(fileSize/(1024 * 1024)).toFixed(2)} MB of ${maxSize/(1024 * 1024)} MB`;
		}
  }
  
  updateAttachmentSize = (value) => {
    this.setState((prevState) => ({uploadSize: prevState.uploadSize + value}), () => {
			if (this.state.uploadSizeBar) {
				this.uploadBarHandler(this.state.uploadSize);
			}
		})
	}	

	closeUploadWindow = (idToEliminate) => {		
		this.setState((prevState) => ({filesIDs: prevState.filesIDs.filter((id) => id !== Number(idToEliminate))}));
	}

  render() {
    return (
      <form method="post" action="/filesTest" id='form' encType="multipart/form-data" acceptCharset="utf-8">        
        <div className="file-uploader__wrapper">
					{this.state.multipleFiles && <FileUploaderAddBtn insertNewFileHandler={this.insertNewFileHandler} />}
					<div className='file-uploader__files-container'>
						<FilesList 
							filesIDs={this.state.filesIDs} 
							uploadSize={this.state.uploadSize} 
							maxSizes={{uploadMaxSize: this.state.uploadMaxSize, fileMaxSize: this.state.fileMaxSize}} 
							updateAttachmentSize={this.updateAttachmentSize}
							closeUploadWindow={this.closeUploadWindow} 
							multipleFiles={this.state.multipleFiles}
							uploadSizeBar={this.state.uploadSizeBar}
						/>
					</div>
					{(this.state.uploadSizeBar && this.state.filesIDs.length > 0) && <FileUploaderBar uploadMaxSize={this.state.uploadMaxSize}/>}
        </div>
        <input type="submit" value='submit' />
      </form>
    );
  }
}

export default FileUploader;
