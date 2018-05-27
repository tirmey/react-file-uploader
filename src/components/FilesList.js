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
    document.querySelector(`#label-${attachment}`).classList[method1]("remover-arquivo");
    document.querySelector(`.texto-${attachment}`).innerHTML = info;
    document.querySelector(`#label-${attachment} i`).classList[method2]("fa-upload");
    document.querySelector(`#label-${attachment} i`).classList[method1]("fa-times");
    document.querySelector(`#label-${attachment} i`).classList[method1](`remover-${attachment}`);
  };

  const inputAnexosHandler = (e) => {
    let fileId = e.target.id.split('-')[e.target.id.split('-').length - 1]; 
    if(document.querySelector(`#label-anexo-${fileId} i`).classList.contains("fa-upload") && e.target.files[0].size < props.maxSizes.fileMaxSize && props.uploadSize + e.target.files[0].size < props.maxSizes.uploadMaxSize) {          
      props.updateAttachmentSize(e.target.files[0].size);
      attachHandler(e, `anexo-${fileId}`, "attach");      
        
    } else if (e.target.files[0] && (e.target.files[0].size > props.maxSizes.fileMaxSize || props.uploadSize + e.target.files[0].size > props.maxSizes.uploadMaxSize)) {
      //print message to show the error: 
      console.log('>>>>>> maximum size exceeded');
      e.target.value = "";        
    }     
  };

  const removeFilesHandler = (e) => {
    if (e.target.classList.contains("remover-arquivo")) {
      e.preventDefault();
      let idArquivo = e.target.id.split('-')[e.target.id.split('-').length - 1];
      props.updateAttachmentSize(-document.getElementById(`anexo-${idArquivo}`).files[0].size);
      document.getElementById(`anexo-${idArquivo}`).value = "";
      attachHandler(e, `anexo-${idArquivo}`, "remove");
    }
  }

  const clickCloseWindow = (e) => {
		const idToEliminate = e.target.dataset.id.split('-').pop();
    props.closeUploadWindow(idToEliminate);
    if (document.getElementById(`anexo-${idToEliminate}`).files[0]) {
      const fileSize = document.getElementById(`anexo-${idToEliminate}`).files[0].size;
      props.updateAttachmentSize(-fileSize);
    }
	}

  return (  
    props.filesIDs.map(id => 
      (<div key={id} id={`file-upload-arquivo-${id}`} className="file-upload file-upload-arquivos">
        {props.multipleFiles && <span className='fechar-janela' data-id={`file-upload-arquivo-${id}`} onClick={clickCloseWindow}>X</span>}
        <label>
          <p>Arquivo:</p>
          <i className="far fa-info-circle"></i>
          <span className="dica">Clique no botão de upload abaixo para selecionar o arquivo</span>
        </label>
        <div className="anexo">
          <div className={`texto texto-anexo-${id}`}></div>
          <label className="label-upload" htmlFor={`anexo-${id}`} id={`label-anexo-${id}`} onClick={removeFilesHandler}>
            <i className="fal fa-upload"></i><span className="span-anexar">Anexar Arquivo</span>
          </label>
          <input type="file" name="anexo" id={`anexo-${id}`} className="anexo" onChange={inputAnexosHandler} />
        </div>
      </div>)
    )   
  );
};

export default FileList;
