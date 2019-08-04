// importing modules
import React from 'react';
import PropTypes from 'prop-types';

const summary = props => (
    <div className="summary">
        <p className="summary__title">PORTFOLIO BALANCE</p>
        <h1 className="summary__balance">
        $
        {props.summary.toFixed(2)}
        </h1>
    </div>
);

summary.propTypes = {
    summary: PropTypes.number
};

summary.defaultProps = {
    summary: 0
};

export default summary;
