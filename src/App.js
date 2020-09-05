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
          <Route path="/coins/:coin" children={({ match }) => (
              <CoinPage coin = {match.params.coin}></CoinPage>
          )}/>
          <Route path="/">
              <MarketsPage updatePage = {this.updatePage}></MarketsPage>
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default App;