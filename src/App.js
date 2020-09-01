import React, { Component } from 'react';
import './App.css';
import MarketsPage from './MarketsPage';
import CoinPage from './CoinPage';

class App extends Component {
  state = {
    page: 1,
    value: '',
    totalCoins: 0
  }

  updatePage = (newPage, newValue, totalCoins) => {
    this.setState({page: newPage, value: newValue, totalCoins: totalCoins})
    this.render();
  }
  
  render() {
    if(this.state.page == 1) {
      return this.drawPage1();
    }
    else if(this.state.page == 2) {
      return this.drawPage2(this.state.value, this.state.totalCoins);
    }
  }

  drawPage1() {
    return (
      <div>
        <MarketsPage updatePage = {this.updatePage}></MarketsPage>
      </div>
    );
  }
  
  drawPage2(coin, totalCoins) {
    return (
      <div>
        <CoinPage value = {coin} totalCoins = {totalCoins} updatePage = {this.updatePage}></CoinPage>
      </div>
    );
  }
}
export default App;