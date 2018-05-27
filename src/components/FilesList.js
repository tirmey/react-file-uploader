import React from 'react';

const FileList = (props) => {  

  const attachHandler = function(e, attachment, task) {
    var method1, method2, info;
    if (task === "attach") {
      method1 = "add"; method2 = "remove";
      info = `file ${e.target.value.split("\\")[2]} attached`;
    } else {
      e.preventDefault();
      method1 = "remove"; method2 = "add"; info = "";
    }
    document.querySelector(`#label-${attachment}`).classList[method1]("remove-file");
    document.querySelector(`.texto-${attachment}`).innerHTML = info;
    document.querySelector(`#label-${attachment} i`).classList[method2]("fa-upload");
    document.querySelector(`#label-${attachment} i`).classList[method1]("fa-times");
    document.querySelector(`#label-${attachment} i`).classList[method1](`remover-${attachment}`);
  };

  const inputAnexosHandler = (e) => {
    let fileId = e.target.id.split('-')[e.target.id.split('-').length - 1]; 
    if(document.querySelector(`#label-attach-${fileId} i`).classList.contains("fa-upload") && e.target.files[0].size < props.maxSizes.fileMaxSize && props.uploadSize + e.target.files[0].size < props.maxSizes.uploadMaxSize) {          
      props.updateAttachmentSize(e.target.files[0].size);
      attachHandler(e, `attach-${fileId}`, "attach");      
        
    } else if (e.target.files[0] && (e.target.files[0].size > props.maxSizes.fileMaxSize || props.uploadSize + e.target.files[0].size > props.maxSizes.uploadMaxSize)) {
      //print message to show the error: 
      console.log('>>>>>> maximum size exceeded');
      e.target.value = "";        
    }     
  };

  const removeFilesHandler = (e) => {
    if (e.target.classList.contains("remove-file")) {
      e.preventDefault();
      let idArquivo = e.target.id.split('-')[e.target.id.split('-').length - 1];
      props.updateAttachmentSize(-document.getElementById(`attach-${idArquivo}`).files[0].size);
      document.getElementById(`attach-${idArquivo}`).value = "";
      attachHandler(e, `attach-${idArquivo}`, "remove");
    }
  }

  const clickCloseWindow = (e) => {
    const idToEliminate = e.target.dataset.id.split('-').pop();
    props.closeUploadWindow(idToEliminate);
    if (document.getElementById(`attach-${idToEliminate}`).files[0]) {
      const fileSize = document.getElementById(`attach-${idToEliminate}`).files[0].size;
      props.updateAttachmentSize(-fileSize);
    }
	}

  return (  
    props.filesIDs.map(id => 
      (<div key={id} id={`file-upload-${id}`} className="file-uploader file-uploader__div">
        {props.multipleFiles && <span className='file-uploader__close-window' data-id={`file-upload-${id}`} onClick={clickCloseWindow}><i className='fal fa-times'></i></span>}
        <label>
          <p>Arquivo:</p>
          <i className="far fa-info-circle"></i>
          <span className="file-uploader__hint">Clique no botão de upload abaixo para selecionar o arquivo</span>
        </label>
        <div className="file-uploader__attach">
          <div className={`file-uploader__text texto-attach-${id}`}></div>
          <label className="file-uploader__label-upload" htmlFor={`attach-${id}`} id={`label-attach-${id}`} onClick={removeFilesHandler}>
            <i className="fal fa-upload"></i><span className="file-uploader__span-attach">attach a file</span>
          </label>
          <input type="file" name="attach" id={`attach-${id}`} className="file-uploader__attach" onChange={inputAnexosHandler} required />
        </div>
      </div>)
    )   
  );
};

export default FileList;
