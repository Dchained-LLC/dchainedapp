import React, { Component } from 'react';
import './App.css';
import MarketsPage from './MarketsPage';
import CoinPage from './CoinPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.value = [];
    this.totalCoins = 0;
  }
  
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/coins/:coin" children={({ match, location }) => (
              <CoinPage coin = {match.params.coin} search={location.search}></CoinPage>
          )}/>
          <Route path="/">
              <MarketsPage></MarketsPage>
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default App;