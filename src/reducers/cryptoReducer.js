//default reducer state:
const defaultState = {
    coinSearched: {
        name: '',
        symbol: '',
        logo: '',
        price: 0,
        percentChange: 0
    },
    market: {
        btcDom: 100,
        dailyVolume: 100,
        marketCap: 100
    },
    coinsList: [], // suggestions array
    coins: [],
    summary: 0,
};

//test reducer:
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
              name: action.coinSearched.name,
              symbol: action.coinSearched.symbol,
              logo: action.coinSearched.logo,
              price: action.coinSearched.price,
              percentChange: action.coinSearched.percentChange
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
            coins: state.coins.filter((coin) => coin._id !== action.id)
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
            } else {
                return coin;
            }
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
            } else {
                return coin;
            }
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
            } else {
                return coin;
            }
        })
        };

      default:
        return state;
    }
  };

  export default cryptoReducer;

const currencyFormat = (num) => {
  return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}