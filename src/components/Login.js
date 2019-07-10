// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';
//importing components
import Footer from './FooterDefault';
// importing images
import blue_waves from '../assets/img/waves-blk.svg';
import profile_img from '../assets/img/user.svg';
import crypto_wallet from '../assets/img/bitcoin-wallet.svg';

const Login = (props) => {
        return (
            <div>
                <header className="loginPage__header z-depth-5">
                    <div className="loginPage__header--logo--wrap">
                        <h3 className="loginPage__header--title">CRYPTOLIO</h3>
                    </div>
                    <div>
                        <NavLink to="/dashboard" className="btn-small waves-effect waves-light header__btn--explore">EXPLORE</NavLink>
                        <NavLink to="/" className="btn-small waves-effect waves-light header__btn">SIGN UP</NavLink>
                    </div>
                </header>
                <div className="login">
                    <div className="login__col--left">
                    <img src={crypto_wallet} className="login__wallet--img" />

                        <div className="login__form--container">
                            <div className="login__title--wrap">
                                <h3 className="login__title">Hey there! Welcome back.</h3>
                            </div>
                            <form onSubmit={props.handleLogin} className="login__form">
                                <div className="login__form--input--wrap input--email z-depth-5">
                                    <input className="login__form--input" type="email" placeholder="Email Address" name="email" autoComplete="off"/>
                                </div>
                                <div className="login__form--input--wrap input--password z-depth-5">
                                    <input className="login__form--input" type="password" placeholder="Password" name="password" autoComplete="off"/>
                                </div>
                                <div className="login__form--btn--wrap">
                                    <button className="login__form--btn--login waves-effect waves-light z-depth-5" type="submit">LOGIN</button>
                                    <p className="login__form--btn--forgot">Forgot Password?</p>
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
};

export default Login;