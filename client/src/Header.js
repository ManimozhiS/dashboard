import React from 'react';
import "./Header.css";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';

function Header() {
    return(
        <div className="header">
        <img className="header__logo"
        src="https://s3-symbol-logo.tradingview.com/itc--600.png"/>

        <div className="header__nav">

        <div className="header__optionnotification">
        <DashboardIcon />
        </div>

        <div className="header__option">
        <span className="header_optionlineone">My Dashboard</span>    
        </div>

        <div className="header__optionnotification">
        <PersonIcon />
        </div>

        <div className="header__option">
        <span className="header_optionlineone">User Login</span>
        </div>

        <div className="header__optionnotification">
        <NotificationsIcon />
        </div>
        </div>    
        </div>
    );
}
export default Header