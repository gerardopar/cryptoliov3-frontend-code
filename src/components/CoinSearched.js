import React from 'react';

const CoinSearched = (props) => {
    let priceChangeText;

    if(props.percentChange > 0) { // testing if % change is > 0
        priceChangeText = (
            <p className="teal-text text-lighten-2">
                {props.percentChange}%&uarr;
            </p>
        );
    } else if(props.percentChange < 0) { // testing if % change is < 0
        priceChangeText = (
            <p className="red-text text-lighten-2">
                {props.percentChange}%&darr;
            </p>
        );
    } else if (props.percentChange === 0) { // testing if % change is 0
        priceChangeText = (
            <p className="white-text text-darken-1">
                {props.percentChange}%
            </p>
        );
    }

    return (
        <div className="coinSearched">
        
            <div className="coinSearched__row--one z-depth-5">
                <div>
                    <img className="coinSearched__img" alt="currency logo" src={props.logo}/>
                    <p className="coinSearched__text">{props.symbol} | {props.name}</p>
                </div>
                <div>
                    <p className="coinSearched__text">${props.price}</p>
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
                        disabled={props.isAuth ? false : true}
                        onClick={props.handleAddCoin} 
                        className="btn-small waves-effect waves-light coinSearched__btn--add z-depth-5">
                            ADD COIN
                    </button>
                </div>
                <div>
                    <button onClick={props.handleClearCoinSearch} type="submit" className="btn-small grey waves-effect waves-light z-depth-5">CLEAR SEARCH</button>
                </div>
            </div>

            </div>
        </div>
    )
};

export default CoinSearched;
