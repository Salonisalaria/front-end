import React, { Component } from "react";
import logo from "../../assets/images/logo.png"
import { CiWallet } from 'react-icons/ci';
import { AiOutlineTransaction } from 'react-icons/ai';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { IoLogOutOutline } from 'react-icons/io5';
import "../../assets/styles/navbar.css";

class Navbar extends Component {
    handleClick = (e) => {
        if(e.target.id === "overview" && !e.target.classList.contains("active-nav")) {
            window.location.replace('http://localhost:3000/wallet');
        } else if(e.target.id === "transaction") {
            window.location.replace('http://localhost:3000/transaction');
        }
    }

    handleLogout = () => {
        localStorage.clear();
        window.location.replace('http://localhost:3000/');
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3 wallet-navbar h-100">
                <div className="wallet-logo">
                    <img src={logo} alt="Loading ..." className="center" />
                </div>
                <div>
                    <button onClick={this.handleClick}><span id="overview" className={`wallet-navs w-100 center ${window.location.pathname==="/wallet" ? " active-nav" : ""}`}>
                        <HiOutlineSquares2X2 /> Overview
                    </span></button>
                    <button onClick={this.handleClick}><span id="transaction" className={`wallet-navs w-100 center ${window.location.pathname==="/transaction" ? " active-nav" : ""}`}>
                        <AiOutlineTransaction /> Transactions
                    </span></button>
                    {/* <button onClick={this.handleClick}><span id="wallet" className="wallet-navs w-100 center">
                        <CiWallet /> Wallet
                    </span></button> */}
                    <button onClick={this.handleLogout}><span id="logout" className="wallet-navs w-100 center">
                        <IoLogOutOutline /> Logout
                    </span></button>
                </div>
            </div>
        )
    }
}

export default Navbar