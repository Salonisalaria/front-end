import { format } from 'date-fns';

export const TRANSACTION_COLUMNS = [
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

export const CSV_FIELDS = [
  {
      label: 'Transaction ID',
      key: 'transactionId',
    },
    {
      label: 'Description',
      key: 'transactionDescription',
    },
    {
      label: 'Transaction Type',
      key: 'transactionType',
    },
    {
      label: 'Transaction Amount',
      key: 'transactionAmout',
    },
    {
      label: 'Transaction Status',
      key: 'transactionStatus',
    },
    {
      label: 'Balance Amount',
      key: 'balanceAmount',
    },
    {
      label: 'Date Of Transaction',
      key: 'createdAt',
    }
]