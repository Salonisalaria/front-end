import React, { Component } from "react";
import Form from "../form";
import Loader from "../loader";
import { FORM_FIELDS } from "../../constants/login-wallet";
import "../../assets/styles/setup-wallet.css";
import welcome from "../../assets/images/welcome.gif";

class LoginWallet extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            isLoading: false,
        }
    }

    componentWillMount() {
        let isLoggedIn = localStorage.getItem("isLogin")
        if(isLoggedIn === true) {
            window.location.replace('http://localhost:3000/wallet');
        }
    }

    onChangeHandler = (event) => {
        let { name, value } = event.target

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async () => {
        this.setState({isLoading: true});
        let { username } = this.state;
        let requestOptions = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: username,
            })
        };
        
        await fetch('http://localhost:8080/wallet/login', requestOptions)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            this.setState({isLoading: false});
            if(data.errMsg) {
                alert(data.errMsg)
            } else {
                localStorage.setItem("isLogin", true);
                localStorage.setItem("ID", data.id);
                localStorage.setItem("Name", data.name);
                localStorage.setItem("Balance", data.balance);
                window.location.replace('http://localhost:3000/wallet');
            }
        })
    }

    render() {
        const { isLoading } = this.state

        return (
            <div className="row h-100">
                {isLoading && <Loader />}
                <div className="col-xs-12 col-md-6 d-flex flex-wrap align-items-center login-image">
                    <img src={welcome} alt="loading..." className="center" />
                </div>
                <div id="loginform" className="col-xs-12 col-md-6  d-flex flex-wrap align-items-center">
                    <Form
                    formHeader={"LOG IN YOUR WALLET"}
                    formFields={FORM_FIELDS}
                    buttonTitle={"SIGN IN"}
                    onChange={this.onChangeHandler} 
                    onSubmit={this.handleSubmit}
                    extraMessage={"Don't have an account ? <a href='/'>Signup</a>"}
                    />
                </div>
            </div>
        );
    }
}

export default LoginWallet;