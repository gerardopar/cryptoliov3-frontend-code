import React from 'react';

const Summary = (props) => {
    return (
    <div className="summary">
        <p className="summary__title">PORTFOLIO BALANCE</p>
        <h1 className="summary__balance">${props.summary.toFixed(2)}</h1>
    </div>
    )
};

export default Summary;
