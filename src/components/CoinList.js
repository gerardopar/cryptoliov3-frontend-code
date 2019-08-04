// importing react
import React from 'react';
import PropTypes from 'prop-types';

// importing components
import CoinItem from './CoinItem';

const coinList = props => (
    <React.Fragment>
    {
        props.coins.map(coin => (
        <CoinItem
          key={coin.symbol}
          {...coin}
          handleCoinsToAdd={props.handleCoinsToAdd}
          handleCoinsToClear={props.handleCoinsToClear}
          handleCoinsToRemove={props.handleCoinsToRemove}
          handleRemoveCoin={props.handleRemoveCoin}
        />
        ))
    }
    </React.Fragment>
);

export default coinList;

coinList.propTypes = {
    coins: PropTypes.arrayOf(PropTypes.object),
    handleCoinsToAdd: PropTypes.func,
    handleCoinsToClear: PropTypes.func,
    handleCoinsToRemove: PropTypes.func,
    handleRemoveCoin: PropTypes.func
};

coinList.defaultProps = {
    coins: [],
    handleCoinsToAdd: () => {},
    handleCoinsToClear: () => {},
    handleCoinsToRemove: () => {},
    handleRemoveCoin: () => {}
};
