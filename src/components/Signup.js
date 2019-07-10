import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// importing images
import blue_waves from '../assets/img/waves-blk.svg';
import profile_img from '../assets/img/user.svg';
import crypto_wallet from '../assets/img/bitcoin-wallet.svg';
//importing components
import Footer from './FooterDefault';

class Signup extends Component{
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
                        <NavLink to="/login" className="btn-small waves-effect waves-light header__btn">LOG IN</NavLink>
                    </div>
                </header>

                <div className="login">
                    <div className="login__col--left">
                    <img src={crypto_wallet} className="login__wallet--img" />

                        <div className="login__form--container">
                            <div className="login__title--wrap">
                                <h3 className="login__title">Join us! Start tracking your portfolio.</h3>
                            </div>
                            <form onSubmit={this.handleSignup} className="login__form">
                                <div className="login__form--input--wrap input--email z-depth-5">
                                    <input className="login__form--input" type="email" placeholder="Email Address" name="email" autoComplete="off"/>
                                </div>
                                <div className="login__form--input--wrap input--password z-depth-5">
                                    <input className="login__form--input" type="password" placeholder="Password" name="password" autoComplete="off"/>
                                </div>
                                <div className="login__form--btn--wrap">
                                    <button className="login__form--btn--login waves-effect waves-light z-depth-5" type="submit">SIGN UP</button>
                                    <NavLink to="/login" className="login__form--btn--forgot">Already have an account?</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div style={{
                        backgroundImage: `url(${blue_waves})` }}
                        className="login__col--right">
                        <img className="login__profile--img z-depth-5" src={profile_img} />
                    </div>
                </div>

                <Footer />

            </div>
        );
    }
};

export default Signup;