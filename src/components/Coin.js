//importing react
import React from 'react';
// coinItem component
import CoinItem from './CoinItem';

const Coin = (props) => {
    return (
        <React.Fragment>
        {
            props.coins.map((coin, index) => {
                return(<CoinItem
                    key={index} 
                    {...coin}
                    handleChange={props.handleChange}
                    handleDeleteCoin={props.handleDeleteCoin}
                    handleCoinsToAdd={props.handleCoinsToAdd}
                    handleCoinsToRemove={props.handleCoinsToRemove}
                    handleCoinsToClear={props.handleCoinsToClear}

                    handleRemoveCoin={props.handleRemoveCoin}
                    />);
            })
        }

        </React.Fragment>
    );
};

export default Coin;