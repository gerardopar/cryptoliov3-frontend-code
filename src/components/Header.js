import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    let icon; // intial icon
    props.hidden ? icon = 'expand_more' : icon = 'expand_less'; // conditional icon
    return (
        <header className="header z-depth-5">
            <h3 className="header__title">CRYPTO WALLET</h3>
            <div className="header__btn--wrap">
                {
                    props.isAuth ? 
                        <button
                            onClick={props.handleLogout}
                            className="btn-small waves-effect waves-light red lighten-1 header__btn--logout">
                            LOG OUT
                        </button> :
                        <NavLink to="/login" className="btn-small waves-effect waves-light z-depth-5 header__btn">LOG IN</NavLink>
                }

                {
                    props.isAuth ? 
                        null :
                        <NavLink to="/" className="btn-small waves-effect waves-light z-depth-5 header__btn signup">SIGN UP</NavLink>
                }
                
                <button
                    onClick={props.handleSearchBar}
                    className="material-icons btn-small waves-effect waves-light indigo lighten-1">
                    {icon}
                </button>
                
            </div>
        </header>
    );
};

export default Header;