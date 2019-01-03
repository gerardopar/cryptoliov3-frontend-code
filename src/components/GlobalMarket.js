import React from 'react';

const GlobalMarket = (props) => {

    //function to format numbers
    return (
        <div className="globalMarket">
            <div className="globalMarket__text--wrap z-depth-5">
                <h3 className="globalMarket__text text-white">Market Cap: {props.marketCap}</h3>
            </div>
            <div className="globalMarket__text--wrap z-depth-5">
                <h3 className="globalMarket__text text-white">24hr Vol: {props.dailyVolume}</h3>
            </div>
            <div className="globalMarket__text--wrap z-depth-5">
                <h3 className="globalMarket__text text-white">Btc Dominance: ${props.btcDom}%</h3>
            </div>
        </div>
    )
};

export default GlobalMarket;