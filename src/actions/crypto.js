export const setGlobalMarketAsync = () => { // # async action
    return (dispatch, getState) => {
        return fetch(`https://cryptolio-api-v1.herokuapp.com/globalMarket`, {
            method: 'GET'
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {

            const market = {
                btcDom: data.btcDom.toFixed(2),
                dailyVolume: currencyFormat(data.dailyVolume),
                marketCap: currencyFormat(data.marketCap)
            }

            dispatch(setGlobalMarket(market)); 
        })
        .catch((err) => console.log(err));
    }
}
// # sync action
export const setGlobalMarket = (market) => { // set breakingNews via the async logic
    return {
        type: 'SET_GLOBAL_MARKET',
        market: market
    }
};

export const setAutoSuggestionsAsync = () => { // # async action
    return (dispatch, getState) => {
        return fetch(`https://cryptolio-api-v1.herokuapp.com/coinList`, {
            method: 'GET'
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            dispatch(setAutoSuggestions([...data.coinsList]));
        })
        .catch((err) => console.log(err));
    }
}
// # sync action
export const setAutoSuggestions = (coinsList) => { // set breakingNews via the async logic
    return {
        type: 'SET_COINS_LIST',
        coinsList: [...coinsList]
    }
};

export const setCoinSearchAsync = (coinSearched) => { // # async action
    return (dispatch, getState) => {
        return fetch(`https://cryptolio-api-v1.herokuapp.com/coinSearched`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                coinSearched: coinSearched
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {

            const coinSearched = { // updating the coinSearch initial state
                name: data.coinName,
                symbol: data.coinSymbol,
                logo: data.coinLogo,
                price: data.coinPrice,
                percentChange: data.coinPercentChange
            }

            dispatch(setCoinSearch(coinSearched)); 
        })
        .catch((err) => console.log(err));
    }
}
// # sync action
export const setCoinSearch = (coinSearched) => { // set breakingNews via the async logic
    return {
        type: 'SET_COIN_SEARCH',
        coinSearched: coinSearched
    }
};

// # sync action
export const clearCoinSearch = () => { // set breakingNews via the async logic
    return {
        type: 'CLEAR_COIN_SEARCH'
    }
};

export const setUserCoinsAsync = (token) => { // # async action
    return (dispatch, getState) => {
        return fetch('https://cryptolio-api-v1.herokuapp.com/coins', {
            headers: {
                Authorization: 'Bearer ' + token, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            dispatch(setUserCoins([...data.coins]));
        })
        .catch((err) => (console.log(err)));
    }
}
// # sync action
export const setUserCoins = (coins) => { // set breakingNews via the async logic
    return {
        type: 'SET_USER_COINS',
        coins: [...coins]
    }
};

export const setCoinSummaryAsync = (token) => { // # async action
    return (dispatch, getState) => {
        return fetch('https://cryptolio-api-v1.herokuapp.com/summary', {
            headers: {
                Authorization: 'Bearer ' + token, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            dispatch(setCoinSummary(data.summary));
        })
        .catch((err) => (console.log(err)));
    }
}
// # sync action
export const setCoinSummary = (summary) => { // set breakingNews via the async logic
    return {
        type: 'SET_COIN_SUMMARY',
        summary: summary
    }
};

export const removeCoinAsync = (token, id) => { // # async action
    return (dispatch, getState) => {
        return fetch(`https://cryptolio-api-v1.herokuapp.com/removeCoin`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token, // required to authenticate the user
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            dispatch(removeCoin(id)); 
        })
        .catch((err) => console.log(err));
    }
}
// # sync action
export const removeCoin = (id) => { // set breakingNews via the async logic
    return {
        type: 'REMOVE_COIN',
        id: id
    }
};

export const coinsToAddAsync = (token, id, coinsToAdd) => { // # async action
    return (dispatch, getState) => {
        return fetch(`https://cryptolio-api-v1.herokuapp.com/coinsToAdd`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token, // required to authenticate the user
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                coinsToAdd: coinsToAdd
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            // dispatch(coinsToAdd(id, coinsToAdd));
            dispatch(setUserCoins([...data.coins]));
        })
        .catch((err) => console.log(err));
    }
}
// # sync action
export const coinsToAdd = (id, coinsToAdd) => { // set breakingNews via the async logic
    return {
        type: 'ADD_COINS',
        id: id,
        coinsToAdd: coinsToAdd
    }
};

export const coinsToRemoveAsync = (token, id, coinsToRemove) => { // # async action
    return (dispatch, getState) => {
        return fetch(`https://cryptolio-api-v1.herokuapp.com/coinsToRemove`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token, // required to authenticate the user
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                coinsToRemove: coinsToRemove
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            // dispatch(coinsToRemove(id, coinsToRemove));
            dispatch(setUserCoins([...data.coins]));
        })
        .catch((err) => console.log(err));
    }
}
// # sync action
export const coinsToRemove = (coins) => { // set breakingNews via the async logic
    return {
        type: 'REMOVE_COINS',
        id: id,
        coinsToRemove: coinsToRemove
    }
};

export const coinsToClearAsync = (token, id) => { // # async action
    return (dispatch, getState) => {
        return fetch(`https://cryptolio-api-v1.herokuapp.com/clearCoins`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token, // required to authenticate the user
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            // dispatch(coinsToClear(id));
            dispatch(setUserCoins([...data.coins]));
        })
        .catch((err) => console.log(err));
    }
}
// # sync action
export const coinsToClear = (coins) => { // set breakingNews via the async logic
    return {
        type: 'REMOVE_COINS',
        id: id
    }
};

const currencyFormat = (num) => {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}