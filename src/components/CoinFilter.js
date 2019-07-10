import React from 'react';

const CoinFilter = (props) => (
    <div className="coinFilter">
        <i  onClick={props.handleCoinFilterAsc}
            className="material-icons coinFilter__icon--asc">filter_list</i>
        <i  onClick={props.handleCoinFilterDesc}
        className="material-icons coinFilter__icon--desc">filter_list</i>
    </div>
);

export default CoinFilter;