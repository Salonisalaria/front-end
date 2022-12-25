import React, { Component } from "react";
import logo from "../../assets/images/logo.png"
import { AiOutlineTransaction } from 'react-icons/ai';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { IoLogOutOutline } from 'react-icons/io5';
import "../../assets/styles/navbar.css";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
    handleLogout = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        const { showTransaction, handleClick } = this.props;

        return (
            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3 wallet-navbar h-100">
                <div className="wallet-logo">
                    <img src={logo} alt="Loading ..." className="center" />
                </div>
                <div>
                    <button onClick={handleClick}><span id="overview" className={`wallet-navs w-100 center ${!showTransaction ? " active-nav" : ""}`}>
                        <HiOutlineSquares2X2 /> Overview
                    </span></button>
                    <button onClick={handleClick}><span id="transaction" className={`wallet-navs w-100 center ${showTransaction ? " active-nav" : ""}`}>
                        <AiOutlineTransaction /> Transactions
                    </span></button>
                    <button onClick={this.handleLogout}><span id="logout" className="wallet-navs w-100 center">
                        <IoLogOutOutline /> Logout
                    </span></button>
                </div>
            </div>
        )
    }
}

export default withRouter(Navbar);