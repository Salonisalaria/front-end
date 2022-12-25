import React, { Component } from "react";
import "../../assets/styles/wallet.css";
import Navbar from "../navbar";
import Loader from "../loader";
import WalletInfo from "../wallet-info";
import Transaction from "../transaction";

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
            showTransaction: false,
        };
    }

    componentWillMount() {
        let isLoggedIn = localStorage.getItem("isLogin")
        if(isLoggedIn !== "true") {
            this.props.history.push('/');
        }
    }

    handleNav = (e) => {
        console.log(e.target.id);
        if(e.target.id === "overview") {
            this.setState({
                showTransaction: false
            });
        } else if(e.target.id === "transaction") {
            this.setState({
                showTransaction: true
            });
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
        
        await fetch(process.env.REACT_APP_BACKEND_URL + '/transact/' + walletId, requestOptions)
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
        const { showTransaction, name, walletId, balance, amount, description, transactionType, isLoading } = this.state;

        return (
            <div className="h-100">
                 {isLoading && <Loader />}
                <div className="wallet-bg w-100 h-100">
                    <div className="wallet-page center row">
                        <Navbar showTransaction={showTransaction} 
                        handleClick={this.handleNav}
                        />
                        <div className="col-xs-12 col-sm-12 col-md-7 col-lg-9 h-100 wallet-body row">
                            {showTransaction ?
                            <Transaction 
                            name={name}
                            />
                            :
                            <WalletInfo
                            name={name}
                            walletId={walletId}
                            balance={balance}
                            amount={amount}
                            description={description}
                            transactionType={transactionType}
                            handleChange={this.handleChange}
                            handleTransaction={this.handleTransaction}
                            />
                            }
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