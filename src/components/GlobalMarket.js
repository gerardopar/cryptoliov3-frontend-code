// importing modules
import React from 'react';
import PropTypes from 'prop-types';

const globalMarket = props => (
    <div className="globalMarket">
        <div className="globalMarket__text--wrap z-depth-5">
            <h3 className="globalMarket__text text-white">
            Market Cap:
            {' '}
            {props.marketCap}
            </h3>
        </div>
        <div className="globalMarket__text--wrap z-depth-5">
            <h3 className="globalMarket__text text-white">
            24hr Vol:
            {' '}
            {props.dailyVolume}
            </h3>
        </div>
        <div className="globalMarket__text--wrap z-depth-5">
            <h3 className="globalMarket__text text-white">
            Btc Dominance: $
            {props.btcDom}
            %
            </h3>
        </div>
    </div>
);

globalMarket.propTypes = {
    btcDom: PropTypes.number,
    dailyVolume: PropTypes.string,
    marketCap: PropTypes.string
};

globalMarket.defaultProps = {
    btcDom: 0,
    dailyVolume: 0,
    marketCap: 0
};

export default globalMarket;
