// importing modules
import React from 'react';
import PropTypes from 'prop-types';

const coinItem = (props) => {
    let priceChangeText;

    if (props.percentChange > 0) { // testing if % change is > 0
        priceChangeText = (
            <p className="teal-text text-lighten-2">
                {props.percentChange.toFixed(2)}
                %&uarr;
            </p>
        );
    } else if (props.percentChange < 0) { // testing if % change is < 0
        priceChangeText = (
            <p className="red-text text-lighten-2">
                {props.percentChange.toFixed(2)}
                %&darr;
            </p>
        );
    } else if (props.percentChange === 0) { // testing if % change is 0
        priceChangeText = (
            <p className="white-text text-darken-1">
                {props.percentChange.toFixed(2)}
                %
            </p>
        );
    }

    return (
        <div>
            <div className="coinItem">
                <div className="coinItem__wrap z-depth-5">
                    <div className="coinItem__row--1">
                        <div className="coinItem__img--wrap">
                            <img className="coinItem__img" src={props.logo} alt="currency logo" />
                            <p className="coinItem__img--text">
                            {props.symbol}
                            {' '}
                            |
                            {' '}
                            {props.name}
                            </p>
                        </div>
                        <div className="coinItem__text--wrap">
                            <p>
                            {props.symbol} 
                            {' '}
                            {props.coinsAvailable}
                            </p>
                            <p className="coinItem__text">available</p>
                        </div>
                    </div>
                    <div className="coinItem__row--2">
                        <div className="coinItem__text--wrap">
                            $
                            {props.coinsAvailableValue.toFixed(2)}
                            <p className="coinItem__text">value</p>
                        </div>
                        <div className="coinItem__text--wrap">
                            <p>
                            $
                            {props.price.toFixed(2)}
                            </p>
                            <p className="coinItem__text">price</p>
                        </div>
                        <div className="coinItem__text--wrap">
                            {priceChangeText}
                            <p className="coinItem__text">24hr change</p>
                        </div>
                    </div>
                    <div className="coinItem__row--3">
                        <form onSubmit={e => props.handleCoinsToAdd(e, props._id)} className="coinItem__form">
                            <div className="coinItem__input--wrap">
                                <input className="coinItem__input" type="number" name="coinsToAdd" placeholder={props.symbol} autoComplete="off" />
                                <button className="btn-small coinItem__add waves-effect waves-light indigo lighten-1 z-depth-5" type="submit">
                                +
                                </button>
                            </div>
                        </form>
                        <form onSubmit={e => props.handleCoinsToRemove(e, props._id)} className="coinItem__form">
                            <div className="coinItem__input--wrap">
                                <input className="coinItem__input" type="number" name="coinsToRemove" placeholder={props.symbol} autoComplete="off" />
                                <button className="btn-small coinItem__delete waves-effect waves-light indigo lighten-1 z-depth-5" type="submit">
                                -
                                </button>
                            </div>
                        </form>
                        <button
                          className="btn-small cointItem__btn--clear red waves-effect waves-light z-depth-5"
                          onClick={((e) => {
                            props.handleCoinsToClear(e, props._id);
                        })}
                          type="button"
                        >
                            clear
                            {' '}
                            {props.symbol}
                        </button>
                        <button
                          className="btn-small cointItem__btn--remove red waves-effect waves-light z-depth-5"
                          onClick={((e) => {
                            props.handleRemoveCoin(e, props._id);
                        })}
                          type="button"
                        >
                        remove coin
                        </button>             
                    </div>
                </div>
            </div>
        </div>
    );
};

export default coinItem;

coinItem.propTypes = {
    coinsAvailable: PropTypes.number,
    coinsAvailableValue: PropTypes.number,
    _id: PropTypes.string,
    logo: PropTypes.string,
    percentChange: PropTypes.number,
    price: PropTypes.number,
    name: PropTypes.string,
    symbol: PropTypes.string,
    handleCoinsToAdd: PropTypes.func,
    handleCoinsToClear: PropTypes.func,
    handleCoinsToRemove: PropTypes.func,
    handleRemoveCoin: PropTypes.func
};

coinItem.defaultProps = {
    coinsAvailable: 0,
    coinsAvailableValue: 0,
    _id: '',
    logo: '',
    percentChange: 0,
    price: 0,
    name: '',
    symbol: '',
    handleCoinsToAdd: () => {},
    handleCoinsToClear: () => {},
    handleCoinsToRemove: () => {},
    handleRemoveCoin: () => {}
};
