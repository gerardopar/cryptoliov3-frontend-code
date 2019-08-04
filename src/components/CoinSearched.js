// importing modules
import React from 'react';
import PropTypes from 'prop-types';

const coinSearched = (props) => {
    let priceChangeText;

    if (props.percentChange > 0) { // testing if % change is > 0
        priceChangeText = (
            <p className="teal-text text-lighten-2">
                {props.percentChange}
                %&uarr;
            </p>
        );
    } else if (props.percentChange < 0) { // testing if % change is < 0
        priceChangeText = (
            <p className="red-text text-lighten-2">
                {props.percentChange}
                %&darr;
            </p>
        );
    } else if (props.percentChange === 0) { // testing if % change is 0
        priceChangeText = (
            <p className="white-text text-darken-1">
                {props.percentChange}
                %
            </p>
        );
    }

    return (
        <div className="coinSearched">
            <div className="coinSearched__row--one z-depth-5">
                <div>
                    <img className="coinSearched__img" alt="currency logo" src={props.logo} />
                    <p className="coinSearched__text">
                    {props.symbol}
                    {' '}
                    |
                    {' '}
                    {props.name}
                    </p>
                </div>
                <div>
                    <p className="coinSearched__text">
                    $
                    {props.price}
                    </p>
                    <p className="coinSearched__text--small">price</p>
                </div>
            </div>

            <div className="coinSearched__row--two z-depth-5">
            <div>
                {priceChangeText}
                {<p className="coinSearched__text--small">24hr change</p>}
            </div>
            <div className="coinSearched__btn--wrap">
                <div>
                    <button 
                      disabled={!props.isAuth}
                      onClick={props.handleAddCoin} 
                      className="btn-small waves-effect waves-light coinSearched__btn--add z-depth-5"
                      type="button"
                    >
                    ADD COIN
                    </button>
                </div>
                <div>
                    <button 
                      onClick={props.handleClearCoinSearch} 
                      type="button" 
                      className="btn-small grey waves-effect waves-light z-depth-5"
                    >
                    CLEAR SEARCH
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
};

coinSearched.propTypes = {
    isAuth: PropTypes.string,
    logo: PropTypes.string,
    name: PropTypes.string,
    symbol: PropTypes.string,
    percentChange: PropTypes.number,
    price: PropTypes.number,
    handleAddCoin: PropTypes.func,
    handleClearCoinSearch: PropTypes.func
};

coinSearched.defaultProps = {
    isAuth: '',
    logo: '',
    name: '',
    symbol: '',
    percentChange: 0,
    price: 0,
    handleAddCoin: () => {},
    handleClearCoinSearch: () => {}
};

export default coinSearched;
