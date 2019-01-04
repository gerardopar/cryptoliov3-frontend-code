import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// importing images
import crypto_img from '../assets/img/crypto-money.jpeg';
//importing components
import Footer from './FooterDefault';

class SignupPage extends Component{
    constructor(props){
        super(props);
        this.handleSignup = this.handleSignup.bind(this);
    }

    // method: handles user signup
    handleSignup(e){
        e.preventDefault();
        fetch(`https://cryptolio-api-v1.herokuapp.com/signup`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
            coins: []
        })
        })
        .then(res => {
            if (res.status === 422) {
            throw new Error(
                "Validation failed. Make sure the email address isn't used yet!"
            );
            }
            if (res.status !== 200 && res.status !== 201) {
            console.log('Error!');
            throw new Error('Creating a user failed!');
            }
            return res.json();
        })
        .then(resData => {
            this.props.history.replace('/');
        })
    }

    render(){
        return (
            <div>
                <header className="loginPage__header z-depth-5">
                    <h3 className="loginPage__header--title">CRYPTOLIO</h3>
                    <div>
                        <NavLink to="/dashboard" className="btn-small waves-effect waves-light header__btn--explore">EXPLORE</NavLink>
                        <NavLink to="/" className="btn-small waves-effect waves-light header__btn">LOG IN</NavLink>
                    </div>
                </header>

                <div className="loginPage" style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.10), rgba(66, 66, 66, 0.70)), url(${crypto_img})`
                }}>
                    <div className="loginPage__form--wrap z-depth-5">
                        <h1 className="loginPage__title">Sign Up</h1>
                        <form onSubmit={this.handleSignup} className="loginPage__form">
                            <div className="loginPage__form--input loginPage__input--one">
                                <input className="loginPage__form--input" type="email" placeholder="email" name="email" autoComplete="off"/>
                            </div>
                            <div className="loginPage__form--input">
                                <input className="loginPage__form--input" type="password" placeholder="password" name="password" autoComplete="off"/>
                            </div>
                            <div className="loginPage__btn--wrap">
                                <button type="submit" className="btn-small waves-effect waves-light loginPage__form--login--btn">SIGN UP</button>
                            </div>
                        </form>
                    </div>
                </div>

                <Footer />

            </div>
        );
    }
};

export default SignupPage;