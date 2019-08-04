export const setGlobalMarketAsync = () => // # async action
     (dispatch, getState) => fetch('https://cryptolio-api-v1.herokuapp.com/globalMarket', {
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
        .catch(err => console.log(err))
;
// # sync action
export const setGlobalMarket = market => // set breakingNews via the async logic
     ({
        type: 'SET_GLOBAL_MARKET',
        market
    });
export const setAutoSuggestionsAsync = () => // # async action
     (dispatch, getState) => fetch('https://cryptolio-api-v1.herokuapp.com/coinList', {
            method: 'GET'
        })
        .then(data => data.json())
        .then((data) => {
            dispatch(setAutoSuggestions([...data.coinsList]));
        })
        .catch(err => console.log(err))
;
// # sync action
export const setAutoSuggestions = coinsList => // set breakingNews via the async logic
     ({
        type: 'SET_COINS_LIST',
        coinsList: [...coinsList]
    });
export const setCoinSearchAsync = coinSearched => // # async action
     (dispatch, getState) => fetch('https://cryptolio-api-v1.herokuapp.com/coinSearched', {
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
            const coinSearched = { // updating the coinSearch initial state
                name: data.coinName,
                symbol: data.coinSymbol,
                logo: data.coinLogo,
                price: data.coinPrice,
                percentChange: data.coinPercentChange
            };

            dispatch(setCoinSearch(coinSearched)); 
        })
        .catch(err => console.log(err))
;
// # sync action
export const setCoinSearch = coinSearched => // set breakingNews via the async logic
     ({
        type: 'SET_COIN_SEARCH',
        coinSearched
    })
;

// # sync action
export const clearCoinSearch = () => // set breakingNews via the async logic
     ({
        type: 'CLEAR_COIN_SEARCH'
    });
export const setUserCoinsAsync = token => // # async action
     (dispatch, getState) => fetch('https://cryptolio-api-v1.herokuapp.com/coins', {
            headers: {
                Authorization: `Bearer ${token}`, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then((data) => {
            dispatch(setUserCoins([...data.coins]));
        })
        .catch(err => (console.log(err)))
;
// # sync action
export const setUserCoins = coins => // set breakingNews via the async logic
     ({
        type: 'SET_USER_COINS',
        coins: [...coins]
    });
export const setCoinSummaryAsync = token => // # async action
     (dispatch, getState) => fetch('https://cryptolio-api-v1.herokuapp.com/summary', {
            headers: {
                Authorization: `Bearer ${token}`, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then((data) => {
            dispatch(setCoinSummary(data.summary));
        })
        .catch(err => (console.log(err)))
;
// # sync action
export const setCoinSummary = summary => // set breakingNews via the async logic
     ({
        type: 'SET_COIN_SUMMARY',
        summary
    });
export const removeCoinAsync = (token, id) => // # async action
     (dispatch, getState) => fetch('https://cryptolio-api-v1.herokuapp.com/removeCoin', {
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
        .then((data) => {
            dispatch(removeCoin(id)); 
        })
        .catch(err => console.log(err))
;
// # sync action
export const removeCoin = id => // set breakingNews via the async logic
     ({
        type: 'REMOVE_COIN',
        id
    });
export const coinsToAddAsync = (token, id, coinsToAdd) => // # async action
     (dispatch, getState) => fetch('https://cryptolio-api-v1.herokuapp.com/coinsToAdd', {
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
            // dispatch(coinsToAdd(id, coinsToAdd));
            dispatch(setUserCoins([...data.coins]));
        })
        .catch(err => console.log(err))
;
// # sync action
export const coinsToAdd = (id, coinsToAdd) => // set breakingNews via the async logic
     ({
        type: 'ADD_COINS',
        id,
        coinsToAdd
    });
export const coinsToRemoveAsync = (token, id, coinsToRemove) => // # async action
     (dispatch, getState) => fetch('https://cryptolio-api-v1.herokuapp.com/coinsToRemove', {
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
            // dispatch(coinsToRemove(id, coinsToRemove));
            dispatch(setUserCoins([...data.coins]));
        })
        .catch(err => console.log(err))
;
// # sync action
export const coinsToRemove = coins => // set breakingNews via the async logic
     ({
        type: 'REMOVE_COINS',
        id,
        coinsToRemove
    });
export const coinsToClearAsync = (token, id) => // # async action
     (dispatch, getState) => fetch('https://cryptolio-api-v1.herokuapp.com/clearCoins', {
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
        .catch(err => console.log(err))
;
// # sync action
export const coinsToClear = coins => // set breakingNews via the async logic
     ({
        type: 'REMOVE_COINS',
        id
    })
;

// # sync action
export const filterCoins = filteredCoins => // set breakingNews via the async logic
     ({
        type: 'FILTER_COINS',
        filteredCoins
    });
const currencyFormat = num => `$${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
