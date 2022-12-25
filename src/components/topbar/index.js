import React, { Component } from "react";
import { BiMessageDetail } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import man from "../../assets/images/man.png";
import "../../assets/styles/topbar.css";

class Topbar extends Component {

    render() {
        const { name } =  this.props;
        return(
            <div className="top-nav-bar">
                <div className="top-nav-bar-img">
                    <img src={man} alt="Loading ..." />
                </div>
                <div className="top-nav-bar-icons">
                    <BiMessageDetail />
                    <IoMdNotificationsOutline />
                </div>
                <div className="nav-welcome-text">
                    <span>Welcome, { name }</span> 
                </div>
            </div>
        );
    }
}

export default Topbar;