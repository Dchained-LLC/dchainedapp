import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import NumberFormat from 'react-number-format';

class CoinFinancialInfo extends Component {
    constructor(props) {
        super(props);
        this.value = props.value;
        this.totalCoins = props.totalCoins;
        this.state = {
            assetsData: {},
            range: props.range
        }
    }

    abbreviateNumber = (number, decimals) => {

        var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

        // what tier? (determines SI symbol)
        var tier = Math.log10(number) / 3 | 0;

        // if zero, we don't need a suffix
        if(tier == 0) return number;

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);

        // scale the number
        var scaled = number / scale;

        // format number and add suffix
        return scaled.toFixed(decimals) + suffix;
    }

    scientificToDecimal = (num) => {
        var nsign = Math.sign(num);
        //remove the sign
        num = Math.abs(num);
        //if the number is in scientific notation remove it
        if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
            var zero = '0',
                    parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
                    e = parts.pop(), //store the exponential part
                    l = Math.abs(e), //get the number of zeros
                    sign = e / l,
                    coeff_array = parts[0].split('.');
            if (sign === -1) {
                l = l - coeff_array[0].length;
                if (l < 0) {
                  num = coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
                } 
                else {
                  num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
                }
            } 
            else {
                var dec = coeff_array[1];
                if (dec)
                    l = l - dec.length;
                if (l < 0) {
                  num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
                } else {
                  num = coeff_array.join('') + new Array(l + 1).join(zero);
                }
            }
        }
    
        return nsign < 0 ? '-'+num : num;
    }

    getChangeValue = (myRange, myData) => {
        switch(myRange) {
            case '1D':
                return myData.close_1d_percent_change;
            case '1W':
                return myData.close_1w_percent_change;
            case '1M':
                return myData.close_1m_percent_change;
            case '3M':
                return myData.close_3m_percent_change;
            case '6M':
                return myData.close_6m_percent_change;
            case '1Y':
                return myData.close_1y_percent_change;
            default:
                return myData.close_1w_percent_change;
        }
    };

    render() {
        var changeValue = this.getChangeValue(this.state.range, this.state.assetsData);

        return (
            <div>
                <CssBaseline />
                <Box component="div" mt={2.5} mb={2.5}>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={2}>
                        <div style={{fontSize: '0.8em', textAlign: 'center'}}>Price</div>
                        <div style={{fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center'}}><NumberFormat value={this.state.assetsData.price} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'$'}/></div>
                        <div style={{textAlign: 'center'}}><NumberFormat value={this.state.assetsData.price_btc} decimalScale={8} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} suffix={' BTC'}/></div>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <div style={{fontSize: '0.8em', textAlign: 'center'}}>% Change {this.state.range}</div>
                        <div style={{fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center', color: (changeValue > 0) ? 'green' : 'red'}}><NumberFormat value={changeValue} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'} /></div>
                        <div style={{textAlign: 'center'}}><NumberFormat value={this.state.assetsData.percent_change_24h} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'% 24h'} /></div>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <div style={{fontSize: '0.8em', textAlign: 'center'}}>Market Cap</div>
                        <div style={{fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center'}}>${this.abbreviateNumber(this.state.assetsData.market_cap, 1)}</div>
                        <div style={{textAlign: 'center'}}>Rank <NumberFormat value={this.state.assetsData.market_cap_rank} displayType={'text'} thousandSeparator={true}/> / {this.totalCoins}</div>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <div style={{fontSize: '0.8em', textAlign: 'center'}}>Volume 24H</div>
                        <div style={{fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center'}}>${this.abbreviateNumber(this.state.assetsData.volume_24h, 1)}</div>
                        <div style={{textAlign: 'center'}}>{this.abbreviateNumber(this.state.assetsData.price_btc * this.state.assetsData.volume_24h)} BTC</div>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <div style={{fontSize: '0.8em', textAlign: 'center'}}>Circulating Supply</div>
                        <div style={{fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center'}}>{this.abbreviateNumber(this.state.assetsData.market_cap / this.state.assetsData.price, 2)}</div>
                        <div style={{textAlign: 'center'}}>Max {this.abbreviateNumber(this.state.assetsData.max_supply)}</div>
                    </Grid>
                </Grid>
                </Box>
                <Divider />
            </div>
        );
    }
  
    componentDidMount(){
        fetch('https://api.lunarcrush.com/v2?data=assets&key=12jj7svid98m4xyvzmaalk4&data_points=0&change=' + this.state.range.toLowerCase() + '&symbol=' + this.value)
        .then(function(response) {
            return response.json();
        })
        .then(res => {
            var myData = res.data[0];
            this.setState({assetsData: myData});
        });
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.range != this.props.range) {
            fetch('https://api.lunarcrush.com/v2?data=assets&key=12jj7svid98m4xyvzmaalk4&data_points=0&change=' + this.props.range.toLowerCase() + '&symbol=' + this.value)
            .then(function(response) {
                return response.json();
            })
            .then(res => {
                var myData = res.data[0];
                this.setState({range: this.props.range, assetsData: myData});
            });
        }
    }
}
export default CoinFinancialInfo;