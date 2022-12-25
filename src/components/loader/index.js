import React, { Component } from "react";
import "../../assets/styles/loader.css";
import loading from "../../assets/images/loading.gif";

class Loader extends Component {
    render() {
        return (
            <div className="overlay">
                <div className="overlay__inner">
                    <div className="overlay__content">
                        <img src={loading} alt="loading..." className="center" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Loader;