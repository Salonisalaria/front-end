import React, { Component } from "react";
import "../../assets/styles/wallet.css";
import "../../assets/styles/transaction.css";
import { Table } from 'antd';
import Topbar from "../topbar";
import { TRANSACTION_COLUMNS, CSV_FIELDS } from "../../constants/transaction";
import {CSVLink} from "react-csv";

class Transaction extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            walletId: localStorage.getItem("ID"),
            data: [],
            pagination: {
                onChange: this.updatePageDetails,
                page: 1,
                pageSize: 10,
                showSizeChanger: true,
            }
        };
    }

    updatePageDetails = async (pageNumber, pageSize) => {
        this.setState({
            isLoading: true,
        });

        const { walletId, pagination } = this.state;
        let skip = (pageNumber - 1) * pageSize;
        let limit = pageSize;

        let res = await this.fetchTableData(walletId, skip, limit);
        this.setState({
            isLoading: false,
            data: res.data,
            pagination: {
                ...pagination,
                total: res.total,
                page: pageNumber,
                pageSize: pageSize
            }
        });
    }

    async componentWillMount() {
        let isLoggedIn = localStorage.getItem("isLogin")
        if(isLoggedIn !== "true") {
            this.props.history.push('/');
        }

        this.setState({isLoading: true});
        let { walletId, pagination } = this.state;
        let {page, pageSize} = pagination
        let skip = (page - 1) * pageSize
        let limit = pageSize

        let res = await this.fetchTableData(walletId, skip, limit);
        this.setState({
            isLoading: false,
            data: res.data,
            pagination: {
                ...pagination,
                total: res.total,
            }
        });
    }

    async fetchTableData(walletId, skip, limit) {
        let requestOptions = {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
            }
        };

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/transactions?walletId='+ walletId + "&skip="+ skip + "&limit=" + limit, requestOptions)
        const res = await response.json();
        return res;
    }

    render() {
        const { name } = this.props;
        const { data, pagination } = this.state;

        return (
            <div className="w-100 h-100">
                <Topbar name={name} />
                <div className="transaction-container">
                    <Table columns={TRANSACTION_COLUMNS} dataSource={data} pagination={pagination} scroll={{ y: 420 }} showSizeChanger rowKey={"transactionId"} />
                    <CSVLink
                    headers={CSV_FIELDS}
                    filename={"data.csv"}
                    data={data}
                    className="btn btn-primary"
                    onClick={()=>{
                        alert("The file is downloading");
                    }}
                    >
                            Export to CSV
                    </CSVLink>
                </div>
            </div>
        );
    }
}

export default Transaction;