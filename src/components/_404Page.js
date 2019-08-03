// importing modules
import React from 'react';
import { NavLink } from 'react-router-dom';

const pageNotFound = () => (
    <div>
        <header className="loginPage__header z-depth-5">
            <div className="loginPage__header--logo--wrap">
                <h3 className="loginPage__header--title">CRYPTOLIO</h3>
            </div>
            <div>
                <NavLink to="/" className="btn-small waves-effect waves-light header__btn">Return Home</NavLink>
            </div>
        </header>
        <div className="pageNotFound">
            <h1 className="pageNotFound__title">404</h1>
            <p className="pageNotFound__text">Page Not Found</p>
        </div>
    </div>
);

export default pageNotFound;
