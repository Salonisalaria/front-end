import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SetupWallet from "./components/setup-wallet";
import LoginWallet from "./components/login-wallet";
import Wallet from "./components/wallet";
import Transaction from "./components/transaction";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="h-100">
          <Routes>
            <Route path="/" element={<SetupWallet />} />
            <Route path="/login" element={<LoginWallet />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/transaction" element={<Transaction />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
