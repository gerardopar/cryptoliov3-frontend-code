// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
// importing images
import crypto_img from '../assets/img/crypto-coins.jpeg';
//importing components
import Footer from './FooterDefault';

const LoginPage = (props) => {
    return (
        <div>
            <header className="loginPage__header z-depth-5">
                <h3 className="loginPage__header--title">CRYPTOLIO</h3>
                <div>
                    <NavLink to="/dashboard" className="btn-small waves-effect waves-light header__btn--explore">EXPLORE</NavLink>
                    <NavLink to="/signup" className="btn-small waves-effect waves-light header__btn">SIGN UP</NavLink>
                </div>
            </header>
            
            <div className="loginPage" style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.10), rgba(66, 66, 66, 0.70)), url(${crypto_img})`
            }}>
            <div className="loginPage__form--wrap">
                    <h1 className="loginPage__title">Log In</h1>
                    <form onSubmit={props.handleLogin} className="loginPage__form">
                        <div className="loginPage__form--input loginPage__input--one">
                            <input className="loginPage__form--input" type="email" placeholder="email" name="email" autoComplete="off"/>
                        </div>
                        <div className="loginPage__form--input">
                            <input className="loginPage__form--input" type="password" placeholder="password" name="password" autoComplete="off"/>
                        </div>
                        <div className="loginPage__btn--wrap">
                            <button type="submit" className="btn-small waves-effect waves-light loginPage__form--login--btn">LOG IN</button>
                            <p className="loginPage__btn--text">Forgot Your Password?</p>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default LoginPage;