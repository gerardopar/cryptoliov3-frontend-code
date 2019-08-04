// default reducer state:
const defaultState = {
    coinSearched: {
        name: '',
        symbol: '',
        logo: '',
        price: 0,
        percentChange: 0
    },
    market: {
        btcDom: 0,
        dailyVolume: 0,
        marketCap: 0
    },
    coinsList: [], // suggestions array
    coins: [],
    summary: 0
};

// crypto reducer:
const cryptoReducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'SET_GLOBAL_MARKET':
        return {
            ...state,
            market: {
              btcDom: action.market.btcDom,
              dailyVolume: action.market.dailyVolume,
              marketCap: action.market.marketCap
            }
        };

        case 'SET_COINS_LIST':
        return {
            ...state,
            coinsList: [...action.coinsList]
        };

        case 'SET_COIN_SEARCH':
        return {
            ...state,
            coinSearched: {
              name: action.coin.name,
              symbol: action.coin.symbol,
              logo: action.coin.logo,
              price: action.coin.price,
              percentChange: action.coin.percentChange
          }
        };

        case 'CLEAR_COIN_SEARCH':
        return {
            ...state,
            coinSearched: {
              name: '',
              symbol: '',
              logo: '',
              price: 0,
              percentChange: 0
          }
        };

        case 'SET_USER_COINS':
        return {
            ...state,
            coins: [...action.coins]
        };

        case 'SET_COIN_SUMMARY':
        return {
            ...state,
            summary: action.summary
        };

        case 'REMOVE_COIN':
        return {
            ...state,
            coins: state.coins.filter(coin => coin._id !== action.id)
        };

        case 'ADD_COINS':
        return {
          ...state,
          coins: state.coins.map((coin) => {
            if (coin.id === action.id) {
                return {
                    ...coin,
                    coinsAvailable: coin.coinsAvailable += action.coinsToAdd
                };
            } 
                return coin;
        })
        };

        case 'REMOVE_COINS':
        return {
          ...state,
          coins: state.coins.map((coin) => {
            if (coin.id === action.id) {
                return {
                    ...coin,
                    coinsAvailable: coin.coinsAvailable -= action.coinsToRemove
                };
            } 
                return coin;
        })
        };

        case 'CLEAR_COINS':
        return {
          ...state,
          coins: state.coins.map((coin) => {
            if (coin.id === action.id) {
                return {
                    ...coin,
                    coinsAvailable: 0
                };
            } 
                return coin;
        })
        };

        case 'FILTER_COINS':
        return {
          ...state,
          coins: [...action.filteredCoins]
        };

      default:
        return state;
    }
  };

  export default cryptoReducer;
