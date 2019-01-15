import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// importing components
import Header from './Header'; 
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import GlobalMarket from './GlobalMarket';
import Summary from './Summary';
import CoinSearched from './CoinSearched';
import Message from './Message';
import Coin from './Coin';
import Footer from './Footer';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            hidden: false,
            // coinSearched: { // test coinSearched values
            //     name: 'BITCOIN',
            //     symbol: 'BTC',
            //     logo: 'https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/bitcoincash_bch_bitcoin-512.png',
            //     price: 4000.00,
            //     percentChange: -0.25
            // },
            coinSearched: { // test coinSearched values
                name: '',
                symbol: '',
                logo: '',
                price: 0,
                percentChange: 0
            },
            // market: {
            //     btcDom: 53.21,
            //     dailyVolume: 23249168212,
            //     marketCap: 127937398710
            // },
            market: {
                btcDom: 0,
                dailyVolume: 0,
                marketCap: 0
            },
            coinsList: [], // suggestions array
            suggestions: [],
            search: '',
            coins: [],
            isAuth: false,
            summary: 0,

        }
        this.handleCoinsList = this.handleCoinsList.bind(this);
        this.getUserInput = this.getUserInput.bind(this);
        this.selectSearch = this.selectSearch.bind(this);
        this.clearSuggestions = this.clearSuggestions.bind(this);

        this.handleCoinSummary = this.handleCoinSummary.bind(this); 
        this.handleLoadCoins = this.handleLoadCoins.bind(this);
        this.handleSearchBar = this.handleSearchBar.bind(this);
        this.handleCoinSearch = this.handleCoinSearch.bind(this);
        this.handleGlobalMarket = this.handleGlobalMarket.bind(this);
        this.handleClearCoinSearch = this.handleClearCoinSearch.bind(this);
        this.handleAddCoin = this.handleAddCoin.bind(this);
        this.handleRemoveCoin = this.handleRemoveCoin.bind(this);
        this.handleCoinsToAdd = this.handleCoinsToAdd.bind(this);
        this.handleCoinsToRemove = this.handleCoinsToRemove.bind(this);
        this.handleCoinsToClear = this.handleCoinsToClear.bind(this);
    }

    componentDidMount(){
        this.handleGlobalMarket(); // ! handles global market values
        this.handleCoinsList(); // ! handles the coinsList suggestion state
        this.props.token ? this.handleLoadCoins() : null; //! handles loading user coins
        this.props.token ? this.handleCoinSummary() : null; //! handles the portfolio summary
        this.props.token ? this.setState({isAuth: true}) : this.setState({isAuth: false}); // updates auth state
    }

    // ! -------------------- auto suggestion ----------------------

    // method: handles the coin suggestions
    handleCoinsList(){
        fetch('https://cryptolio-api-v1.herokuapp.com/coinList', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            return data.json();
        })
        .then((data) => {
            this.setState(() => ({
                coinsList: [...data.coinsList] // set the suggestions array
            }));
        })
        .catch((err) => (console.log(err)));
    }

    // method: fetches suggestion based on user input
    getUserInput(e){
        e.preventDefault();
        let coinSearch = e.target.value.trim().toUpperCase(); // onchange user input
        let coinLength = coinSearch.length; // onchange user input length

        // ! test filter logic
        let suggestions = coinLength === 0 ? [] : this.state.coinsList.filter(lang => // filters coins from suggestions coinsLists
            lang.name.toUpperCase().slice(0, coinLength) === coinSearch
        );

        this.setState(() => ({
            suggestions: suggestions, // set suggestions array
            search: coinSearch // set search input
        }));
    }

    // method: selects the search input from the list
    selectSearch(e, coinSearched){
        this.setState(() => ({
            search: coinSearched.toUpperCase() // updates the user's search input
        }));
    }


    // method: clears the suggestion list
    clearSuggestions(){
        this.setState(() => ({
            suggestions: [] // clears the suggestions list 
        }));
    }

    // ! -------------------- auto suggestion ----------------------

    // method: handles the portfolio summary 
    handleCoinSummary(){
        fetch('https://cryptolio-api-v1.herokuapp.com/summary', {
            headers: {
                Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            this.setState(() => ({
                summary: data.summary // udpating the summary state
            }));
        })
        .catch((err) => (console.log(err)));
    }

    // method: handles fetching the users coins
    handleLoadCoins(){
        
        fetch('https://cryptolio-api-v1.herokuapp.com/coins', {
            headers: {
                Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            this.setState(() => ({
                coins: data.coins
            }));
            
        })
        .catch((err) => (console.log(err)));
    }

    // method: handles searchbar toggle
    handleSearchBar(e){
        e.preventDefault();
        this.setState({ hidden: !this.state.hidden });
    }

    // method: handles coin searched
    handleCoinSearch(e){
        e.preventDefault();
        const coinSearched = e.target.elements.coinSearched.value; // user input
        fetch(`https://cryptolio-api-v1.herokuapp.com/coinSearched`, {
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
            this.setState(() => ({
                coinSearched:{ // updating the coinSearch initial state
                    name: data.coinName,
                    symbol: data.coinSymbol,
                    logo: data.coinLogo,
                    price: data.coinPrice,
                    percentChange: data.coinPercentChange
                }
            }));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // method: handles the global market values
    handleGlobalMarket() {
        //fetch global market from the api here
        fetch('https://cryptolio-api-v1.herokuapp.com/globalMarket', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {

            this.setState(() => ({
                market: {
                    btcDom: data.btcDom.toFixed(2),
                    dailyVolume: currencyFormat(data.dailyVolume),
                    marketCap: currencyFormat(data.marketCap)
                }
            }));
        })
        .catch((err) => (console.log(err)));
    }

    // method: handles clearing the search state
    handleClearCoinSearch(e){
        e.preventDefault();
        this.setState(() => ({
            coinSearched: {
                name: '',
                symbol: '',
                logo: '',
                price: 0,
                percentChange: 0
            }
        }));
    }

    // method: adds a coin to the wallet/currencies tracked
    handleAddCoin(e){
        e.preventDefault();
        fetch(`https://cryptolio-api-v1.herokuapp.com/addCoin`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.coinSearched.name,
                symbol: this.state.coinSearched.symbol,
                logo: this.state.coinSearched.logo,
                price: this.state.coinSearched.price,
                percentChange: this.state.coinSearched.percentChange
            })
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {

            this.setState(() => ({ // clearing the coinSearched
                coinSearched: {
                    name: '',
                    symbol: '',
                    logo: '',
                    price: 0,
                    percentChange: 0
                }
            }));

            this.setState(() => ({
                coins: data.coins
            }));

        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleRemoveCoin(e, id){
        e.preventDefault();

        fetch(`https://cryptolio-api-v1.herokuapp.com/removeCoin`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
        })
        .then(res => {
            if (res.status === 422) {
            throw new Error('Validation failed.');
            }
            if (res.status !== 200 && res.status !== 201) {
            throw new Error('Could not authenticate you!');
            }
            return res.json();
        })
        .then((result) => {
            this.setState((prevState) => ({
                coins: prevState.coins.filter((coin) => coin._id !== id)
            }))
            this.handleCoinSummary(); //! handles the portfolio summary
        })
        .catch(err => {
            console.log(err);
        });
    }

        // method: adds coins owned
        handleCoinsToAdd(e, id){
            e.preventDefault();
            const coinsToAdd = e.target.elements.coinsToAdd.value; // user input

            fetch(`https://cryptolio-api-v1.herokuapp.com/coinsToAdd`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
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
                this.setState(() => ({
                    coins: data.coins
                }));
                this.handleCoinSummary(); //! handles the portfolio summary
            })
            .catch((err) => {
                console.log(err);
            })
        }

        // method: removes coins owned
        handleCoinsToRemove(e, id){
            e.preventDefault();
            const coinsToRemove = e.target.elements.coinsToRemove.value; // user input

            fetch(`https://cryptolio-api-v1.herokuapp.com/coinsToRemove`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
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
                this.setState(() => ({
                    coins: data.coins
                }));
                this.handleCoinSummary(); //! handles the portfolio summary
            })
            .catch((err) => {
                console.log(err);
            })
        }

        handleCoinsToClear(e, id){
            e.preventDefault();
            fetch(`https://cryptolio-api-v1.herokuapp.com/clearCoins`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + this.props.token, // required to authenticate the user
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
                this.setState(() => ({
                    coins: data.coins
                }));
                this.handleCoinSummary(); //! handles the portfolio summary
            })
            .catch((err) => {
                console.log(err);
            })
        }

    render(){
        return (
            <React.Fragment>
            {
                this.state.market.marketCap !== 0 
                    ? <div className="dashboard">
            
                    <Header
                        isAuth={this.state.isAuth}
                        hidden={this.state.hidden}
                        handleSearchBar={this.handleSearchBar} 
                        handleLogout={this.props.handleLogout}
                    />
    
                    <ReactCSSTransitionGroup
                        transitionName="trans"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        { this.state.hidden ? null : 
                            <SearchBar 
                                suggestions={this.state.suggestions}
                                selectSearch={this.selectSearch}
                                clearSuggestion={this.clearSuggestions}
    
                                search={this.state.search}
                                getUserInput={this.getUserInput} 
                                handleCoinSearch={this.handleCoinSearch}
                                /> 
                        }
                    </ReactCSSTransitionGroup>
    
                    <GlobalMarket 
                        btcDom={this.state.market.btcDom}
                        dailyVolume={this.state.market.dailyVolume}
                        marketCap={this.state.market.marketCap}
                    />
    
                    <Summary summary={this.state.summary}/>
    
                    <ReactCSSTransitionGroup
                        transitionName="trans"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                    {
                        this.state.coinSearched.name.length > 0 
                            ? <CoinSearched 
                                isAuth={this.state.isAuth}
                                name={this.state.coinSearched.name}
                                symbol={this.state.coinSearched.symbol}
                                logo={this.state.coinSearched.logo}
                                price={this.state.coinSearched.price}
                                percentChange={this.state.coinSearched.percentChange}
                                handleClearCoinSearch={this.handleClearCoinSearch}
                                handleAddCoin={this.handleAddCoin}
                            /> : null 
                    }
                    </ReactCSSTransitionGroup>
    
                    <ReactCSSTransitionGroup
                        transitionName="trans"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                    {
                        this.state.coins.length > 0 ? 
                            <Coin 
                                coins={this.state.coins} 
                                handleCoinsToAdd={this.handleCoinsToAdd}
                                handleCoinsToRemove={this.handleCoinsToRemove}
                                handleCoinsToClear={this.handleCoinsToClear}
                                handleRemoveCoin={this.handleRemoveCoin}
                            /> 
                            : this.state.isAuth === true ? 
                                <Message 
                                    span={'Add coins to get started'} 
                                    title={'NO COINS CURRENTLY TRACKED'}
                                /> : 
                                <Message 
                                    span={'Login or Signup to start tracking coins!'} 
                                    title={'NO COINS CURRENTLY TRACKED'}
                                />
                    }
                    </ReactCSSTransitionGroup>
                    <Footer />
                </div> : <Spinner />
            }
            
            </React.Fragment>
        )
    }

};

export default Dashboard;

const currencyFormat = (num) => {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}


