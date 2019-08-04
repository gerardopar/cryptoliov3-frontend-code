// importing modules
import React from 'react';
import PropTypes from 'prop-types';

const coinFilter = props => (
    <div className="coinFilter">
        <i
          onClick={props.handleCoinFilterAsc}
          className="material-icons coinFilter__icon--asc"
        >
        filter_list
        </i>
        <i
          onClick={props.handleCoinFilterDesc}
          className="material-icons coinFilter__icon--desc"
        >
        filter_list
        </i>
    </div>
);

coinFilter.propTypes = {
    handleCoinFilterAsc: PropTypes.func,
    handleCoinFilterDesc: PropTypes.func
};

coinFilter.defaultProps = {
    handleCoinFilterAsc: () => {},
    handleCoinFilterDesc: () => {}
};

export default coinFilter;
