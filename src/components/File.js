import React from 'react';

const FilesList = (props) => {
  const id = props.id.length === 0 ? 0 : props.id.pop() + 1;
  return (    
    <div id={`file-upload-arquivo-${id}`} class="file-upload file-upload-arquivos">
      <span class='fechar-janela' data-id={`file-upload-arquivo-${id}`}>X</span>
      <label>
        <p>Arquivo:</p>
        <i class="fa fa-info"></i>
        <span class="dica">Clique no botão de upload abaixo para selecionar o arquivo</span>
      </label>
      <div class="anexo">
        <div class={`texto texto-anexo-${id}`}></div>
        <label class="label-upload" for={`anexo-${id}`} id={`label-anexo-${id}`}>
          <i class="fal fa-upload"></i><span class="span-anexar">Anexar Arquivo</span>
        </label>
        <input type="file" name="anexo" id={`anexo-${id}`} class="anexo" />
      </div>
    </div>
    
    
  );
};

export default FilesList;
