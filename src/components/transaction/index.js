import React, { Component } from "react";
import "../../assets/styles/wallet.css";
import "../../assets/styles/transaction.css";
import { Table } from 'antd';
import Topbar from "../topbar";
import { TRANSACTION_COLUMNS } from "../../constants/transaction";

class Transaction extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            walletId: localStorage.getItem("ID"),
            data: [],
        };
    }

    async componentWillMount() {
        let isLoggedIn = localStorage.getItem("isLogin")
        if(isLoggedIn !== "true") {
            this.props.history.push('/');
        }

        this.setState({isLoading: true});
        let { walletId } = this.state;
        let requestOptions = {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
            }
        };
        
        await fetch(process.env.REACT_APP_BACKEND_URL + '/transactions?walletId='+ walletId + "&skip=0&limit=0", requestOptions)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            this.setState({isLoading: false});
            if(data.errMsg) {
                alert(data.errMsg)
            } else {
                this.setState({
                    data: data
                });
            }
        })
    }

    render() {
        const { name } = this.props;
        const { data } = this.state;

        return (
            <div className="w-100 h-100">
                <Topbar name={name} />
                <div className="transaction-container">
                    <Table columns={TRANSACTION_COLUMNS} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: 450 }} size={"large"} />
                </div>
            </div>
        );
    }
}

export default Transaction;