// importing modules
import React from 'react';

const message = props => (
    <div className="message">
        <div className="message__wrap">
            <p className="message__span">{props.span}</p>
            <h1 className="message__title">{props.title}</h1>
        </div>
    </div>
);

message.propTypes = {
    span: PropTypes.string,
    title: PropTypes.string
};

message.defaultProps = {
    span: '',
    title: ''
};

export default message;
