//importing react
import React, { Component } from 'react';
// importing react-router
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
//importing modules
import moment from 'moment';
//importing components
import Login from '../components/Login';
import Signup from '../components/Signup';
import Dashboard from '../components/Dashboard';
import _404Page from '../components/_404Page';

//AppRouter component
class AppRouter extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuth: false,
            token: null
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleAutoLogout = this.handleAutoLogout.bind(this);
    }

    componentDidMount() {
        // checking if auth token is set
        const token = localStorage.getItem('token');
        const expDate = localStorage.getItem('tokenExpires') 
        const date = Date.now(); // current date
        const currentDate = moment(date).format('MMMM Do YYYY, h:mm:ss a'); // current date format

        if(token) {
            this.setState({ isAuth: true, token: token });
        }
        if(expDate < currentDate) {
            this.handleAutoLogout();
        }
    }

    // method: authenticates user
    handleLogin(e){
        e.preventDefault();
        fetch(`https://cryptolio-api-v1.herokuapp.com/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        })
        })
        .then(res => {
            if (res.status === 422) {
            throw new Error('Validation failed.');
            }
            if (res.status !== 200 && res.status !== 201) {
            console.log('Error!');
            throw new Error('Could not authenticate you!');
            }
            return res.json();
        })
        .then(resData => {
            this.setState(() => ({
                isAuth: true,
                token: resData.token
            }));
            const date = Date.now(); // new token date
            const dateAdded = moment(date).format('MMMM Do YYYY, h:mm:ss a'); // token creation date
            const dateAhead = moment(date).add(1, 'h'); // token life
            const dateToBeRemoved = moment(dateAhead._d).format('MMMM Do YYYY, h:mm:ss a'); // token remove date
            localStorage.setItem('tokenCreated', dateAdded);
            localStorage.setItem('tokenExpires', dateToBeRemoved);
            localStorage.setItem('isAuth', true);
            localStorage.setItem('token', resData.token);
            localStorage.setItem('userId', resData.userId);
        })
        .catch(err => {
            console.log(err);
        });
    };

    // method: handles logout
    handleLogout(e){
        e.preventDefault();
        this.setState(() => ({
            isAuth: false
        }));
        localStorage.removeItem('tokenCreated');
        localStorage.removeItem('tokenExpires');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    // method : handles Auto logout 
    handleAutoLogout(){
        this.setState(() => ({
            isAuth: false
        }));
        localStorage.removeItem('tokenCreated');
        localStorage.removeItem('tokenExpires');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    render(){
        let routes = (
            <Switch>
            <Route path="/" exact={true}
                    component={Signup}
            />
            <Route path="/login" exact={true}
                render={props => (
                    <Login
                    {...props}
                    handleLogin={this.handleLogin} />
            )}/>
            <Route path="/dashboard" exact={true}
                render={props => (
                    <Dashboard
                    {...props}
                    handleLogout={this.handleLogout}
                    token={this.state.token}/>
            )}/>
            <Route
                    render={props => (
                        <_404Page
                        {...props}
                        />
            )}/>
            <Redirect to="/dashboard" />
            </Switch>
            
        );
        if(this.state.isAuth) {
            routes = (
            <Switch>   
            <Route path="/" exact={true}
                render={props => (
                    <Dashboard
                    {...props}
                    handleLogout={this.handleLogout}
                    token={this.state.token}/>
            )}/>
            <Redirect to="/" />
            </Switch>
            );
        }
        return (
        <BrowserRouter>
            <div>
                {routes}
            </div>
        </BrowserRouter>
        )
    }
};

export default AppRouter;