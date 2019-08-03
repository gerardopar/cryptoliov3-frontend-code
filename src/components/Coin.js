// importing react
import React from 'react';

// importing components
import CoinItem from './CoinItem';

const Coin = props => (
    <React.Fragment>
    {
        props.coins.map((coin, index) => (
        <CoinItem
          key={index} 
          {...coin}
          handleChange={props.handleChange}
          handleDeleteCoin={props.handleDeleteCoin}
          handleCoinsToAdd={props.handleCoinsToAdd}
          handleCoinsToRemove={props.handleCoinsToRemove}
          handleCoinsToClear={props.handleCoinsToClear}

          handleRemoveCoin={props.handleRemoveCoin}
        />
        ))
    }
    </React.Fragment>
);

export default Coin;
