const currencyFormat = num => `$${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

// # sync action
export const setGlobalMarket = market => ({
    type: 'SET_GLOBAL_MARKET',
    market
});
// #async action
export const setGlobalMarketAsync = () => dispatch => fetch('https://cryptolio-api-v1.herokuapp.com/globalMarket', {
    method: 'GET'
})
.then(data => data.json())
.then((data) => {
    const market = {
        btcDom: data.btcDom.toFixed(2),
        dailyVolume: currencyFormat(data.dailyVolume),
        marketCap: currencyFormat(data.marketCap)
    };

    dispatch(setGlobalMarket(market)); 
})
.catch(err => console.log(err));

// # sync action
export const setAutoSuggestions = coinsList => ({
    type: 'SET_COINS_LIST',
    coinsList: [...coinsList]
});
// #async action
export const setAutoSuggestionsAsync = () => dispatch => fetch('https://cryptolio-api-v1.herokuapp.com/coinList', {
    method: 'GET'
})
.then(data => data.json())
.then((data) => {
    dispatch(setAutoSuggestions([...data.coinsList]));
})
.catch(err => console.log(err));

// # sync action
export const setCoinSearch = coin => ({
    type: 'SET_COIN_SEARCH',
    coin
});
// # async action
export const setCoinSearchAsync = coinSearched => dispatch => fetch('https://cryptolio-api-v1.herokuapp.com/coinSearched', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        coinSearched
    })
})
.then(data => data.json())
.then((data) => {
    const coin = { // updating the coinSearch initial state
        name: data.coinName,
        symbol: data.coinSymbol,
        logo: data.coinLogo,
        price: data.coinPrice,
        percentChange: data.coinPercentChange
    };

    dispatch(setCoinSearch(coin)); 
})
.catch(err => console.log(err));

// # sync action
export const setUserCoins = coins => ({
    type: 'SET_USER_COINS',
    coins: [...coins]
});
// # async action
export const setUserCoinsAsync = token => dispatch => fetch('https://cryptolio-api-v1.herokuapp.com/coins', {
    headers: {
        Authorization: `Bearer ${token}`, // required to authenticate the user
        'Content-Type': 'application/json'
    }
})
.then(data => data.json())
.then((data) => {
    dispatch(setUserCoins([...data.coins]));
})
.catch(err => (console.log(err)));

// # sync action
export const setCoinSummary = summary => ({
    type: 'SET_COIN_SUMMARY',
    summary
});
// # async action
export const setCoinSummaryAsync = token => dispatch => fetch('https://cryptolio-api-v1.herokuapp.com/summary', {
    headers: {
        Authorization: `Bearer ${token}`, // required to authenticate the user
        'Content-Type': 'application/json'
    }
})
.then(data => data.json())
.then((data) => {
    dispatch(setCoinSummary(data.summary));
})
.catch(err => (console.log(err)));

// # sync action
export const removeCoin = id => ({
    type: 'REMOVE_COIN',
    id
});
// # async action
export const removeCoinAsync = (token, id) => dispatch => fetch('https://cryptolio-api-v1.herokuapp.com/removeCoin', {
    method: 'DELETE',
    headers: {
        Authorization: `Bearer ${token}`, // required to authenticate the user
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id
    })
})
.then(data => data.json())
.then(() => {
    dispatch(removeCoin(id)); 
})
.catch(err => console.log(err));

// # sync action
export const coinsToAddSync = (id, coinsToAdd) => ({
    type: 'ADD_COINS',
    id,
    coinsToAdd
});
// # async action
export const coinsToAddAsync = (token, id, coinsToAdd) => dispatch => fetch('https://cryptolio-api-v1.herokuapp.com/coinsToAdd', {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`, // required to authenticate the user
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id,
        coinsToAdd
    })
})
.then(data => data.json())
.then((data) => {
    // dispatch(coinsToAddSync(id, coinsToAdd));
    dispatch(setUserCoins([...data.coins]));
})
.catch(err => console.log(err));

// # sync action
export const coinsToRemoveSync = (id, coinsToRemove) => ({
    type: 'REMOVE_COINS',
    id,
    coinsToRemove
});
// # async action
export const coinsToRemoveAsync = (token, id, coinsToRemove) => dispatch => fetch('https://cryptolio-api-v1.herokuapp.com/coinsToRemove', {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`, // required to authenticate the user
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id,
        coinsToRemove
    })
})
.then(data => data.json())
.then((data) => {
    // dispatch(coinsToRemoveSync(id, coinsToRemove));
    dispatch(setUserCoins([...data.coins]));
})
.catch(err => console.log(err));

// # sync action
export const coinsToClear = id => ({
    type: 'REMOVE_COINS',
    id
});
// # async action
export const coinsToClearAsync = (token, id) => dispatch => fetch('https://cryptolio-api-v1.herokuapp.com/clearCoins', {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`, // required to authenticate the user
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id
    })
})
.then(data => data.json())
.then((data) => {
    // dispatch(coinsToClear(id));
    dispatch(setUserCoins([...data.coins]));
})
.catch(err => console.log(err));

// # sync action
export const clearCoinSearch = () => ({
    type: 'CLEAR_COIN_SEARCH'
});

// # sync action
export const filterCoins = filteredCoins => ({
    type: 'FILTER_COINS',
    filteredCoins
});
