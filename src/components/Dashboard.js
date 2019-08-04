// importing modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// importing utility functions
import { AscCoinSort, DescCoinSort } from '../utils/sortFunc';

// importing redux actions
import { 
    setGlobalMarketAsync, 
    setAutoSuggestionsAsync, 
    setCoinSearchAsync, 
    clearCoinSearch,
    setUserCoinsAsync,
    setCoinSummaryAsync,
    removeCoinAsync,
    coinsToAddAsync,
    coinsToRemoveAsync,
    coinsToClearAsync,
    filterCoins 
} from '../actions/crypto';

// importing components
import Header from './Header'; 
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import GlobalMarket from './GlobalMarket';
import Summary from './Summary';
import CoinFilter from './CoinFilter';
import CoinSearched from './CoinSearched';
import Message from './Message';
import Coin from './CoinList';
import Footer from './Footer';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            hidden: false,
            suggestions: [],
            search: '',
            isAuth: false,
        };

        this.getUserInput = this.getUserInput.bind(this);
        this.selectSearch = this.selectSearch.bind(this);
        this.clearSuggestions = this.clearSuggestions.bind(this);
        this.handleCoinSummary = this.handleCoinSummary.bind(this); 
        this.handleLoadCoins = this.handleLoadCoins.bind(this);
        this.handleSearchBar = this.handleSearchBar.bind(this);
        this.handleCoinSearch = this.handleCoinSearch.bind(this);
        this.handleClearCoinSearch = this.handleClearCoinSearch.bind(this);
        this.handleAddCoin = this.handleAddCoin.bind(this);
        this.handleRemoveCoin = this.handleRemoveCoin.bind(this);
        this.handleCoinsToAdd = this.handleCoinsToAdd.bind(this);
        this.handleCoinsToRemove = this.handleCoinsToRemove.bind(this);
        this.handleCoinsToClear = this.handleCoinsToClear.bind(this);
        this.handleCoinFilterAsc = this.handleCoinFilterAsc.bind(this);
        this.handleCoinFilterDesc = this.handleCoinFilterDesc.bind(this);
    }

    componentDidMount() {
        this.props.setGlobalMarketAsync(); // # redux
        this.props.setAutoSuggestionsAsync(); // # redux
        this.props.token ? this.handleLoadCoins() : null; //! handles loading user coins
        this.props.token ? this.handleCoinSummary() : null; //! handles the portfolio summary
        this.props.token ? this.setState({ isAuth: true }) : this.setState({ isAuth: false }); // updates auth state
    }

    // ! -------------------- auto suggestion ----------------------

    // method: fetches suggestion based on user input
    getUserInput(e) {
        e.preventDefault();
        const coinSearch = e.target.value.trim().toUpperCase(); // onchange user input
        const coinLength = coinSearch.length; // onchange user input length

        // ! test filter logic
        const suggestions = coinLength === 0 ? [] : this.props.coinsList.filter(lang => // filters coins from suggestions coinsLists
            lang.name.toUpperCase().slice(0, coinLength) === coinSearch);

        this.setState(() => ({
            suggestions, // set suggestions array
            search: coinSearch // set search input
        }));
    }

    // method: selects the search input from the list
    selectSearch(e, coinSearched) {
        this.setState(() => ({
            search: coinSearched.toUpperCase() // updates the user's search input
        }));
    }

    // method: clears the suggestion list
    clearSuggestions() {
        this.setState(() => ({
            suggestions: [] // clears the suggestions list 
        }));
    }

    // ! -------------------- auto suggestion ----------------------

    // method: handles the portfolio summary 
    handleCoinSummary() {
        this.props.setCoinSummaryAsync(this.props.token);
    }

    // method: handles fetching the users coins
    handleLoadCoins() {
        this.props.setUserCoinsAsync(this.props.token);
    }

    // method: handles searchbar toggle
    handleSearchBar(e) {
        e.preventDefault();
        this.setState({ hidden: !this.state.hidden });
    }

    // method: handles coins sorting Ascending order
    handleCoinFilterAsc(e) {
        e.preventDefault();
        const filteredCoinsByPrice = AscCoinSort(this.props.coins);
        this.props.filterCoins(filteredCoinsByPrice);
    }

    // method: handles coins sorting Descending order
    handleCoinFilterDesc(e) {
        e.preventDefault();
        const filteredCoinsByPrice = DescCoinSort(this.props.coins);
        this.props.filterCoins(filteredCoinsByPrice);
    }

    handleCoinSearch(e) {
        e.preventDefault();
        const coinSearched = e.target.elements.coinSearched.value; // user input
        this.props.setCoinSearchAsync(coinSearched);
        this.setState({ search: '' });
    }

    // method: handles clearing the search state
    handleClearCoinSearch() {
        this.props.clearCoinSearch();
    }

    // method: adds a coin to the wallet/currencies tracked
    handleAddCoin(e) {
        e.preventDefault();

        // prevents a coin from being added if it already exists in the users portfolio
        const coinExists = this.props.coins.find(coin => (coin.name === this.props.coinSearched.name));
        
        if (coinExists) {
            throw new Error('Coin already exists');
        }

        fetch('https://cryptolio-api-v1.herokuapp.com/addCoin', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.props.token}`, // required to authenticate the user
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.props.coinSearched.name,
                symbol: this.props.coinSearched.symbol,
                logo: this.props.coinSearched.logo,
                price: this.props.coinSearched.price,
                percentChange: this.props.coinSearched.percentChange
            })
        })
        .then(data => data.json())
        .then((data) => {
            this.handleClearCoinSearch();
            this.handleLoadCoins();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    async handleRemoveCoin(e, id) {
        e.preventDefault();
        await this.props.removeCoinAsync(this.props.token, id);
        await this.props.setCoinSummaryAsync(this.props.token);
    }

    // method: adds coins owned
    async handleCoinsToAdd(e, id) {
        e.preventDefault();
        const coinsToAdd = e.target.elements.coinsToAdd.value; // user input
        await this.props.coinsToAddAsync(this.props.token, id, coinsToAdd);
        await this.props.setCoinSummaryAsync(this.props.token);
    }

    // method: removes coins owned
    async handleCoinsToRemove(e, id) {
        e.preventDefault();
        const coinsToRemove = e.target.elements.coinsToRemove.value; // user input
        await this.props.coinsToRemoveAsync(this.props.token, id, coinsToRemove);
        await this.props.setCoinSummaryAsync(this.props.token);
    }

    async handleCoinsToClear(e, id) {
        e.preventDefault();
        await this.props.coinsToClearAsync(this.props.token, id);
        await this.props.setCoinSummaryAsync(this.props.token);
    }

    render() {
        return (
            <React.Fragment>
            {  
                this.props.market.marketCap !== 0 
                    ? (
<div className="dashboard">
            
                    <Header
                      isAuth={this.state.isAuth}
                      hidden={this.state.hidden}
                      handleSearchBar={this.handleSearchBar} 
                      handleLogout={this.props.handleLogout}
                    />
    
                    <ReactCSSTransitionGroup
                      transitionName="trans"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                    >
                        { this.state.hidden ? null 
                            : (
<SearchBar 
  suggestions={this.state.suggestions}
  selectSearch={this.selectSearch}
  clearSuggestion={this.clearSuggestions}
    
  search={this.state.search}
  getUserInput={this.getUserInput} 
  handleCoinSearch={this.handleCoinSearch}
/>
) 
                        }
                    </ReactCSSTransitionGroup>
    
                    <GlobalMarket 
                      btcDom={this.props.market.btcDom}
                      dailyVolume={this.props.market.dailyVolume}
                      marketCap={this.props.market.marketCap}
                    />
    
                    <Summary summary={this.props.summary} />
                    <CoinFilter 
                      handleCoinFilterDesc={this.handleCoinFilterDesc}
                      handleCoinFilterAsc={this.handleCoinFilterAsc} 
                    />
    
                    <ReactCSSTransitionGroup
                      transitionName="trans"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                    >
                    {
                        this.props.coinSearched.name.length > 0 
                            ? (
<CoinSearched 
  isAuth={this.state.isAuth}
  name={this.props.coinSearched.name}
  symbol={this.props.coinSearched.symbol}
  logo={this.props.coinSearched.logo}
  price={this.props.coinSearched.price}
  percentChange={this.props.coinSearched.percentChange}
  handleClearCoinSearch={this.handleClearCoinSearch}
  handleAddCoin={this.handleAddCoin}
/>
) : null 
                    }
                    </ReactCSSTransitionGroup>
    
                    <ReactCSSTransitionGroup
                      transitionName="trans"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={500}
                    >
                    {
                        this.props.coins.length > 0 
                            ? (
<Coin 
  coins={this.props.coins} 
  handleCoinsToAdd={this.handleCoinsToAdd}
  handleCoinsToRemove={this.handleCoinsToRemove}
  handleCoinsToClear={this.handleCoinsToClear}
  handleRemoveCoin={this.handleRemoveCoin}
/>
) 
                            : this.state.isAuth === true 
                                ? (
<Message 
  span="Add coins to get started" 
  title="NO COINS CURRENTLY TRACKED"
/>
) 
                                : (
<Message 
  span="Login or Signup to start tracking coins!" 
  title="NO COINS CURRENTLY TRACKED"
/>
)
                    }
                    </ReactCSSTransitionGroup>
                    <Footer />
</div>
) : <Spinner />
            }
            </React.Fragment>
        );
    }
}

// # redux state
const mapStateToProps = state => ({
    market: state.crypto.market,
    coinsList: state.crypto.coinsList,
    coinSearched: state.crypto.coinSearched,
    coins: state.crypto.coins,
    summary: state.crypto.summary
});
// # redux actions
const mapDispatchToProps = dispatch => ({
    setGlobalMarketAsync: () => dispatch(setGlobalMarketAsync()),
    setAutoSuggestionsAsync: () => dispatch(setAutoSuggestionsAsync()),
    setCoinSearchAsync: coinSearch => dispatch(setCoinSearchAsync(coinSearch)),
    clearCoinSearch: () => dispatch(clearCoinSearch()),
    setUserCoinsAsync: token => dispatch(setUserCoinsAsync(token)),
    setCoinSummaryAsync: token => dispatch(setCoinSummaryAsync(token)),
    removeCoinAsync: (token, id) => dispatch(removeCoinAsync(token, id)),
    coinsToAddAsync: (token, id, coinsToAdd) => dispatch(coinsToAddAsync(token, id, coinsToAdd)),
    coinsToRemoveAsync: (token, id, coinsToRemove) => dispatch(coinsToRemoveAsync(token, id, coinsToRemove)),
    coinsToClearAsync: (token, id) => dispatch(coinsToClearAsync(token, id)),
    filterCoins: filteredCoins => dispatch(filterCoins(filteredCoins))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
