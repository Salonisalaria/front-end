import React, { Component } from "react";
import Form from "../form";
import { FORM_FIELDS } from "../../constants/setup-wallet";
import "../../assets/styles/setup-wallet.css";
import welcome from "../../assets/images/welcome.gif";
import Loader from "../loader";

class SetupWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            initialBalance: 0.0000,
            isLoading: false,
        }
    }

    componentWillMount() {
        let isLoggedIn = localStorage.getItem("isLogin")
        if(isLoggedIn === "true") {
            this.props.history.push('/wallet');
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
        let { username, initialBalance } = this.state;
        if(username.trim() === "") {
            alert("Value required for username field")
            this.setState({isLoading: false});
            return;
        }
        initialBalance = Number(initialBalance).toFixed(4);

        let requestOptions = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                name: username,
                balance: initialBalance,
            })
        };
        
        await fetch(process.env.REACT_APP_BACKEND_URL + '/setup', requestOptions)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.setState({isLoading: false});
            if(data.errMsg) {
                alert(data.errMsg)
            } else {
                localStorage.setItem("isLogin", true);
                localStorage.setItem("ID", data.id);
                localStorage.setItem("Name", data.name);
                localStorage.setItem("Balance", data.balance);
                this.props.history.push('/wallet');
            }
        })
    }

    render() {
        const { isLoading } = this.state;

        return (
            <div className="row h-100">
                {isLoading && <Loader />}
                <div className="col-xs-12 col-md-6 d-flex flex-wrap align-items-center login-image">
                    <img src={welcome} alt="loading..." className="center" />
                </div>
                <div id="loginform" className="col-xs-12 col-md-6  d-flex flex-wrap align-items-center">
                    <Form
                    formHeader={"CREATE YOUR WALLET"}
                    formFields={FORM_FIELDS}
                    buttonTitle={"SIGN UP"}
                    onChange={this.onChangeHandler} 
                    onSubmit={this.handleSubmit}
                    extraMessage={"Already have an account ? <a href='/login'>Login</a>"}
                    />
                </div>
            </div>
        );
    }
}

export default SetupWallet;