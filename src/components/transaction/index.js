import React, { Component } from "react";
import "../../assets/styles/wallet.css";
import "../../assets/styles/transaction.css";
import { Table } from 'antd';
import Navbar from "../navbar";
import Topbar from "../topbar";
import { format } from 'date-fns';

const columns = [
  {
    title: 'Transaction ID',
    width: "auto",
    key: 'transactionId',
	dataIndex: 'transactionId',
  },
  {
    title: 'Description',
    key: 'transactionDescription',
    width: "auto",
	dataIndex: 'transactionDescription',
  },
  {
    title: 'Transaction Type',
    width: "auto",
    key: 'transactionType',
	dataIndex: 'transactionType',
	render: data => {return data.toUpperCase()}
  },
  {
    title: 'Transaction Amount',
    key: 'transactionAmout',
    width: "auto",
	sorter: (data1, data2) => data1.transactionAmout - data2.transactionAmout,
	dataIndex: 'transactionAmout',
  },
  {
    title: 'Transaction Status',
    width: "auto",
    key: 'transactionStatus',
	dataIndex: 'transactionStatus',
	render: data => {return data.toUpperCase()}
  },
  {
    title: 'Balance Amount',
    key: 'balanceAmount',
    width: "auto",
	dataIndex: 'balanceAmount',
  },
  {
    title: 'Date Of Transaction',
    key: 'createdAt',
    width: "auto",
	sorter: (data1, data2) => new Date(data1.createdAt) - new Date(data2.createdAt),
	defaultSortOrder: "descend",
	dataIndex: 'createdAt',
	render: data =>{  return format(new Date(data), 'dd/MM/yyyy kk:mm:ss')}
  }
];

class Transaction extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            name: localStorage.getItem("Name"),
            walletId: localStorage.getItem("ID"),
            data: [],
        };
    }

    async componentWillMount() {
        let isLoggedIn = localStorage.getItem("isLogin")
        if(isLoggedIn !== "true") {
            window.location.replace('http://localhost:3000/');
        }

        this.setState({isLoading: true});
        let { walletId } = this.state;
        let requestOptions = {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
            }
        };
        
        await fetch('http://localhost:8080/transactions?walletId='+ walletId + "&skip=0&limit=0", requestOptions)
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
        const { name, data } = this.state;

        return (
            <div className="wallet-bg w-100 h-100">
                <div className="wallet-page center row">
                    <Navbar />
                    <div className="col-xs-12 col-sm-12 col-md-7 col-lg-9 h-100 wallet-body row">
                        <div className="w-100 h-100">
                            <Topbar name={name} />
                            <div className="transaction-container">
                              <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: 450 }} size={"large"} />
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Transaction;