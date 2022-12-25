import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SetupWallet from "./components/setup-wallet";
import LoginWallet from "./components/login-wallet";
import Wallet from "./components/wallet";
import history from "./history";

class App extends Component {
  render() {
    return (
      <Router history={history} forceRefresh={true}>
        <div className="h-100">
          <Switch>
            <Route exact path="/" component={SetupWallet} />
            <Route path="/login" component={LoginWallet} />
            <Route path="/wallet" component={Wallet} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
