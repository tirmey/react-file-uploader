import React from 'react';

const GenericMessages = (props) => {
  return (
    <div className="generic-messages__overlay hidden transparent" onClick={props.callback}>
      <div className="generic-messages__div message-div box-shadow text-color">
        <div className="generic-messages__div__message-header">
          <span>Attention required</span>
          <i className='fal fa-times generic-messages__div__close-icon'></i>
        </div>
        <div className="generic-messages__div__message-body">
          {props.message}
        </div>
      </div>
    </div>
    
  );
};

export default GenericMessages;
