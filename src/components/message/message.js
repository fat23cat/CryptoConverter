import React from 'react';
import  './message.css';

function Message(props) {
  return (
    <div className='message'>
      <span className='message__text'>{props.text}</span>
    </div>
  );
}

export default Message;
