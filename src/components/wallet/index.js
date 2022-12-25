import React, { Component } from "react";
import "../../assets/styles/wallet.css";
import { CiWallet } from 'react-icons/ci';
import { GiTakeMyMoney } from 'react-icons/gi';
import woman from "../../assets/images/woman.png"
import Form from 'react-bootstrap/Form';
import FormInput from "../form/input";
import FormButton from "../form/button";
import Navbar from "../navbar";
import Topbar from "../topbar";
import Loader from "../loader";
import card from "../../assets/images/card.png";

class Wallet extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            name: localStorage.getItem("Name"),
            walletId: localStorage.getItem("ID"),
            balance: localStorage.getItem("Balance"),
            amount: 0,
            description: "",
            transactionType: "credit",
        };
    }

    componentWillMount() {
        let isLoggedIn = localStorage.getItem("isLogin")
        if(isLoggedIn !== "true") {
            window.location.replace('http://localhost:3000/');
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleTransaction = async () => {
        this.setState({isLoading: true});
        let { amount, description, transactionType, walletId } = this.state;
        console.log(transactionType);
        amount = Number(amount).toFixed(4);
        if(transactionType === "debit") {
            amount = -1 * amount;
        }

        let requestOptions = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                amount: amount,
                description: description,
            })
        };
        
        await fetch('http://localhost:8080/transact/' + walletId, requestOptions)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.setState({isLoading: false});
            if(data.errMsg) {
                alert(data.errMsg)
            } else {
                localStorage.setItem("Balance", data.balance);
                this.setState({
                    balance: data.balance,
                    amount: 0,
                    description: "",
                    transactionType: "credit",
                });
            }
        })
    }

    render() {
        const { name, walletId, balance, amount, description, transactionType, isLoading } = this.state;

        return (
            <div className="h-100">
                 {isLoading && <Loader />}
                <div className="wallet-bg w-100 h-100">
                    <div className="wallet-page center row">
                        <Navbar />
                        <div className="col-xs-12 col-sm-12 col-md-7 col-lg-9 h-100 wallet-body row">
                            <div className="w-100 h-100">
                                <Topbar name={ name } />
                                <div className="wallet-option-container">
                                    <div className="col-sm-12 col-md-6 wallet-options">
                                        <div className="wallet-option-card">
                                            <div className="w-100 wallet-details-heading">
                                                <span>WALLET DETAILS</span>
                                            </div>
                                            <div className="w-100 wallet-details-body">
                                                <div className="w-100 wallet-details-body-name">
                                                    <img src={woman} alt="Loading ..." />
                                                    <span>
                                                        <p>Hello, { name }</p>
                                                        <CiWallet /><span>{ walletId }</span><br/>
                                                        <GiTakeMyMoney /><span>{ balance }</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 wallet-options x2">
                                        <div className="wallet-option-card">
                                            <div className="w-100 transaction-heading">
                                                PERFORM A TRANSACTION
                                            </div>
                                            <div className="w-100 transaction-body">
                                                <div className="w-100 transaction-amount">
                                                    <FormInput 
                                                    title={"Amount"}
                                                    name={"amount"}
                                                    type={"number"}
                                                    onChange={this.handleChange}
                                                    value={amount}
                                                    />
                                                </div>
                                                <div className="w-100 transaction-description">
                                                    <FormInput 
                                                    title={"Description"}
                                                    name={"description"}
                                                    type={"text"}
                                                    onChange={this.handleChange}
                                                    value={description}
                                                    />
                                                </div>
                                                <div className="w-100 transaction-toggle">
                                                    <Form.Select name="transactionType" aria-label="Default select example" value={transactionType} onChange={this.handleChange}>
                                                        <option value="credit">Credit</option>
                                                        <option value="debit">Debit</option>
                                                    </Form.Select>
                                                </div>
                                                <div className="transaction-submit">
                                                    <FormButton 
                                                    title={"Process Transaction"}
                                                    extraMessage={""}
                                                    onSubmit={this.handleTransaction}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wallet-option-container">
                                    <div className="col-md-6 wallet-options">
                                        <div className="wallet-option-card wallet-option-img">
                                            <img src={card} alt="Loading ..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Wallet;