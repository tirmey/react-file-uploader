//core
import React, { Component } from 'react';

//components
import FilesList from './FilesList';
//utils
//import {meyer_showMessage, meyer_visibility, classToggler} from './../scripts/meyer';

class FileUploader extends Component {
  state = {
    filesIDs: [],
    uploadSize: 0,
    fileMaxSize: 1 * 1024 * 1024,
		uploadMaxSize: 2 * 1024 * 1024,
		multipleFiles: true
  }  

	componentWillMount() {
		console.log(this.props)
		console.log('montou');
		if (!this.props.multipleFiles) {
			this.setState(() => ({multipleFiles: false, filesIDs: [0], uploadMaxSize: this.state.fileMaxSize}));
		}
	}

  insertNewFile = () => {     
    let id = this.state.filesIDs.length !== 0 ? this.state.filesIDs[0] + 1 : 0;
    this.setState((prevState) => ({filesIDs: [id, ...prevState.filesIDs ]}));
	}
	
	uploadBarHandler = (fileSize) => {
    const maxSize = this.state.uploadMaxSize;
    document.querySelector(`.upload-size-bar-fill`).style.width = `${fileSize*100/maxSize}%`;
    if (fileSize < maxSize/2) {
      document.querySelector(`.upload-size-bar-fill`).style.backgroundColor = '#116466'
    } else if (fileSize >= maxSize/2 && fileSize < maxSize * 0.85) {
      document.querySelector(`.upload-size-bar-fill`).style.backgroundColor = '#d04816';
    } else if (fileSize >= maxSize * 0.85) {
      document.querySelector(`.upload-size-bar-fill`).style.backgroundColor = '#be1717';        
    }
    document.querySelector(`.barra-legenda`).innerHTML = `${(fileSize/(1024 * 1024)).toFixed(2)} MB de ${maxSize/(1024 * 1024)} MB`;
  };
  
  updateAttachmentSize = (value) => {
		console.log(value);
    this.setState((prevState) => ({uploadSize: prevState.uploadSize + value}), () => {
			this.uploadBarHandler(this.state.uploadSize);
      console.log("novo tamanho: ", this.state.uploadSize);
		})
	}	

	closeUploadWindow = (idToEliminate) => {		
		this.setState((prevState) => ({filesIDs: prevState.filesIDs.filter((id) => id !== Number(idToEliminate))}));
	}

  render() {
    return (
      <form method="post" action="/filesTest" id='form' encType="multipart/form-data" acceptCharset="utf-8">
        <input type='text' name='name' /> 
        <div className="file-upload-wrapper">
					{this.state.multipleFiles && <div className="btn-acao btn-inserir-arquivos" onClick={this.insertNewFile}>
						<i className="fa fa-plus-circle" aria-hidden="true"></i>
						<span>upload file</span>
					</div>}
					<div className='arquivos-container'>
						<FilesList 
							filesIDs={this.state.filesIDs} 
							uploadSize={this.state.uploadSize} 
							maxSizes={{uploadMaxSize: this.state.uploadMaxSize, fileMaxSize: this.state.fileMaxSize}} 
							updateAttachmentSize={this.updateAttachmentSize}
							closeUploadWindow={this.closeUploadWindow} 
							multipleFiles={this.state.multipleFiles}
						/>
					</div>
					<div className='div-upload-size-bar'>
						<h3>Total upload size</h3>
						<span>0MB</span>
						<div className='upload-size-bar'>
								<div className='upload-size-bar-fill'></div>
						</div>
						<span>{this.state.uploadMaxSize/(1024 * 1024)}MB</span>
						<span className='barra-legenda'></span>
					</div>
        </div>
        <input type="submit" value='submit' />
      </form>
    );
  }
}

export default FileUploader;
