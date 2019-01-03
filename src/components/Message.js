
import React from 'react';

const Message = (props) => {
    return (
        <div className="message">
            <div className="message__wrap">
                <p className="message__span">{props.span}</p>
                <h1 className="message__title">{props.title}</h1>
            </div>
        </div>
    );
};

export default Message;