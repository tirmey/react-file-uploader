import React from 'react';

const FileUploaderBar = (props) => {
  
  return (    
    <div className='file-uploader-bar__div'>
      <h3>Total upload size</h3>
      <span>0MB</span>
      <div className='file-uploader-bar'>
          <div className='file-uploader-bar__fill'></div>
      </div>
      <span>{props.uploadMaxSize/(1024 * 1024)}MB</span>
      <span className='file-uploader-bar__text'></span>
    </div>
    
    
  );
};

export default FileUploaderBar;
