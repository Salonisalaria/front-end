import React, { Component } from "react";
import { CiWallet } from 'react-icons/ci';
import { GiTakeMyMoney } from 'react-icons/gi';
import woman from "../../assets/images/woman.png"
import Form from 'react-bootstrap/Form';
import FormInput from "../form/input";
import FormButton from "../form/button";
import Topbar from "../topbar";
import card from "../../assets/images/card.png";

class WalletInfo extends Component {
    render() {
        const { name, description, transactionType, walletId, balance, amount, handleChange, handleTransaction } = this.props;

        return (
            <div className="w-100 h-100 row">
                <Topbar name={ name } />
                <div className="wallet-option-container">
                    <div className="col-xs-12 col-sm-12 col-md-6 wallet-options">
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
                    <div className="col-xs-12 col-sm-12 col-md-6 wallet-options x2 visible-sm">
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
                                    onChange={handleChange}
                                    value={amount}
                                    />
                                </div>
                                <div className="w-100 transaction-description">
                                    <FormInput 
                                    title={"Description"}
                                    name={"description"}
                                    type={"text"}
                                    onChange={handleChange}
                                    value={description}
                                    />
                                </div>
                                <div className="w-100 transaction-toggle">
                                    <Form.Select name="transactionType" aria-label="Default select example" value={transactionType} onChange={handleChange}>
                                        <option value="credit">Credit</option>
                                        <option value="debit">Debit</option>
                                    </Form.Select>
                                </div>
                                <div className="transaction-submit">
                                    <FormButton 
                                    title={"Process Transaction"}
                                    extraMessage={""}
                                    onSubmit={handleTransaction}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wallet-option-container">
                    <div className="col-xs-12 col-sm-12 col-md-6 wallet-options">
                        <div className="wallet-option-card wallet-option-img">
                            <img src={card} alt="Loading ..." />
                        </div>
                    </div>
                </div>
                <div className="wallet-option-container hidden-sm">
                <div className="col-xs-12 col-sm-12 col-md-6 wallet-options x2">
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
                                    onChange={handleChange}
                                    value={amount}
                                    />
                                </div>
                                <div className="w-100 transaction-description">
                                    <FormInput 
                                    title={"Description"}
                                    name={"description"}
                                    type={"text"}
                                    onChange={handleChange}
                                    value={description}
                                    />
                                </div>
                                <div className="w-100 transaction-toggle">
                                    <Form.Select name="transactionType" aria-label="Default select example" value={transactionType} onChange={handleChange}>
                                        <option value="credit">Credit</option>
                                        <option value="debit">Debit</option>
                                    </Form.Select>
                                </div>
                                <div className="transaction-submit">
                                    <FormButton 
                                    title={"Process Transaction"}
                                    extraMessage={""}
                                    onSubmit={handleTransaction}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WalletInfo;