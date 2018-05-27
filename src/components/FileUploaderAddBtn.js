import React from 'react';

const FileUploaderAddBtn = (props) => {
  
  return (    
    <div className="file-uploader__add-btn" onClick={props.insertNewFileHandler}>
      <i className="fa fa-plus-circle" aria-hidden="true"></i>
      <span>upload file</span>
    </div>    
  );
};

export default FileUploaderAddBtn;
