import React from 'react';

// importing images
import cm_logo from '../assets/img/coin-market-cap-logo.png';

const FooterDefault = () => (
    <div>
        <footer className="footerDefault">
            <img className="footer__logo" src={cm_logo} alt="coinmarketcap logo"/>
            <div className="footer__text--wrap">
                <p className="white-text">Powered By <a className="grey-text text-darken-3" href="http://coinmarketcap.com" target="_blank">CoinMarketCap</a></p>
            </div>
            <div className="footer__text--wrap">
                <p className="white-text">Copyright© 2019 Cryptolio All Rights Reserved</p>
            </div>
        </footer>
    </div>
);

export default FooterDefault;