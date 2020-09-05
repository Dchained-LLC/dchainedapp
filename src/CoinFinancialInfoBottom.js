import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';
import ArrowDropUpTwoToneIcon from '@material-ui/icons/ArrowDropUpTwoTone';
import { green, red } from '@material-ui/core/colors';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';

class CoinFinancialInfoBottom extends Component {
    constructor(props) {
        super(props);
        this.coinMeta = props.coinMeta;
        this.totalCoins = props.totalCoins;
        this.state = {
            assetsData: {}
        }
    }

    abbreviateNumber = (number) => {

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
        return scaled.toFixed(1) + suffix;
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

    render() {
        return (
            <div>
                <CssBaseline />
                <Box component="div">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className='myPaper' elevation={3}>
                            <div className='titleBig'>Galaxy Score™</div>
                            <div className='information'>
                                <InfoOutlinedIcon color="disabled"/>
                                <div className='myTooltip'>My tootltip</div>
                            </div>
                            <div><span className='score'>{this.state.assetsData.galaxy_score}</span><span className='scoreTotal'>/100</span></div>
                            <div><ProgressBar variant={this.state.assetsData.galaxy_score > 50 ? 'info' : 'danger'} now={this.state.assetsData.galaxy_score} /></div>
                            <div><strong>Higher scores</strong> <span>are better</span></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='myPaper' elevation={3}>
                            <div className='titleBig'>AltRank™</div>
                            <div className='information'>
                                <InfoOutlinedIcon color="disabled"/>
                                <div className='myTooltip'>My tootltip</div>
                            </div>
                            <div className='altRankData'>
                            <div><span className='score'>{this.state.assetsData.alt_rank}</span><span className='scoreTotal'>/{this.totalCoins}</span></div>
                            <div className='rankChange'>24 hour change<br/>{(this.state.assetsData.alt_rank_calc_24h_previous - this.state.assetsData.alt_rank) > 0 ? <ArrowDropUpTwoToneIcon fontSize="large" style={{ color: green[500] }}/>: <ArrowDropDownTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <span style={{color: ((this.state.assetsData.alt_rank_calc_24h_previous - this.state.assetsData.alt_rank) > 0 ? 'green' : 'red')}}>{(this.state.assetsData.alt_rank_calc_24h_previous - this.state.assetsData.alt_rank)} spots</span></div>
                            </div>
                            <div><strong>Lower ranks</strong> <span>are better</span></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3}>
                            <div className='titleSmall'>Social Volume</div>
                            <div className='information'>
                                <InfoOutlinedIcon color="disabled"/>
                                <div className='myTooltip'>My tootltip</div>
                            </div>
                            <div className='value'><NumberFormat value={this.state.assetsData.social_volume_global_1w} displayType={'text'} thousandSeparator={true} suffix={' Posts'}/></div>
                            <div style={{color: (this.state.assetsData.social_volume_1w_percent_change > 0 ? 'green' : 'red')}}>{this.state.assetsData.social_volume_1w_percent_change > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={this.state.assetsData.social_volume_1w_percent_change} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            <div className='prevData'><NumberFormat value={this.state.assetsData.social_volume_global_1w_previous} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. 1w'}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3}>
                            <div className='titleSmall'>Social Engagement</div>
                            <div className='information'>
                                <InfoOutlinedIcon color="disabled"/>
                                <div className='myTooltip'>My tootltip</div>
                            </div>
                            <div className='value'><NumberFormat value={this.state.assetsData.social_score_1w} displayType={'text'} thousandSeparator={true}/></div>
                            <div style={{color: (this.state.assetsData.social_score_1w_percent_change > 0 ? 'green' : 'red')}}>{this.state.assetsData.social_score_1w_percent_change > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={this.state.assetsData.social_score_1w_percent_change} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            <div className='prevData'><NumberFormat value={this.state.assetsData.social_score_1w_previous} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. 1w'}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3}>
                            <div className='titleSmall'>Social Sentiment</div>
                            <div className='information'>
                                <InfoOutlinedIcon color="disabled"/>
                                <div className='myTooltip'>My tootltip</div>
                            </div>
                            <div className='value'><NumberFormat value={(this.state.assetsData.average_sentiment_1w -1) * 25} displayType={'text'} thousandSeparator={true} decimalScale={2} suffix={this.state.assetsData.average_sentiment_1w > 3 ? '% Bullish' : '% Bearish'}/></div>
                            <div style={{color: (this.state.assetsData.average_sentiment_1w_percent_change > 0 ? 'green' : 'red')}}>{this.state.assetsData.average_sentiment_1w_percent_change > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={this.state.assetsData.average_sentiment_1w_percent_change} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            <div className='prevData'><NumberFormat value={(this.state.assetsData.average_sentiment_1w_previous -1) * 25} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'% prev. 1w'}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3}>
                            <div className='titleSmall'>Social Contributors</div>
                            <div className='information'>
                                <InfoOutlinedIcon color="disabled"/>
                                <div className='myTooltip'>My tootltip</div>
                            </div>
                            <div className='value'><NumberFormat value={this.state.assetsData.social_contributors_1w} displayType={'text'} thousandSeparator={true} suffix={' Per Hour'}/></div>
                            <div style={{color: (this.state.assetsData.social_contributors_1w_percent_change > 0 ? 'green' : 'red')}}>{this.state.assetsData.social_contributors_1w_percent_change > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={this.state.assetsData.social_contributors_1w_percent_change} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            <div className='prevData'><NumberFormat value={this.state.assetsData.social_contributors_1w_previous} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. 1w'}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3}>
                            <div className='titleSmall'>News Volume</div>
                            <div className='information'>
                                <InfoOutlinedIcon color="disabled"/>
                                <div className='myTooltip'>My tootltip</div>
                            </div>
                            <div className='value'><NumberFormat value={this.state.assetsData.news_1w} displayType={'text'} thousandSeparator={true} suffix={' Articles'}/></div>
                            <div style={{color: (this.state.assetsData.news_1w_percent_change > 0 ? 'green' : 'red')}}>{this.state.assetsData.news_1w_percent_change > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={this.state.assetsData.news_1w_percent_change} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            <div className='prevData'><NumberFormat value={this.state.assetsData.news_1w_previous} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. 1w'}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3}>
                            <div className='titleSmall'>Spam Volume</div>
                            <div className='information'>
                                <InfoOutlinedIcon color="disabled"/>
                                <div className='myTooltip'>My tootltip</div>
                            </div>
                            <div className='value'><NumberFormat value={this.state.assetsData.tweet_spam_1w} displayType={'text'} thousandSeparator={true} suffix={' Items'}/></div>
                            <div style={{color: (this.state.assetsData.tweet_spam_1w_percent_change > 0 ? 'green' : 'red')}}>{this.state.assetsData.tweet_spam_1w_percent_change > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={this.state.assetsData.tweet_spam_1w_percent_change} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            <div className='prevData'><NumberFormat value={this.state.assetsData.tweet_spam_1w_previous} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. 1w'}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3}>
                            <div className='titleSmall'>Shared Links</div>
                            <div className='information'>
                                <InfoOutlinedIcon color="disabled"/>
                                <div className='myTooltip'>My tootltip</div>
                            </div>
                            <div className='value'><NumberFormat value={this.state.assetsData.url_shares_1w} displayType={'text'} thousandSeparator={true} suffix={' URLs'}/></div>
                            <div style={{color: (this.state.assetsData.url_shares_1w_percent_change > 0 ? 'green' : 'red')}}>{this.state.assetsData.url_shares_1w_percent_change > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={this.state.assetsData.url_shares_1w_percent_change} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            <div className='prevData'><NumberFormat value={this.state.assetsData.url_shares_1w_previous} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. 1w'}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3}>
                            <div className='titleSmall'>Social Dominance</div>
                            <div className='information'>
                                <InfoOutlinedIcon color="disabled"/>
                                <div className='myTooltip'>My tootltip</div>
                            </div>
                            <div className='value'><NumberFormat value={this.state.assetsData.social_dominance} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            <div style={{color: (this.state.assetsData.social_dominance_1w_percent_change > 0 ? 'green' : 'red')}}>{this.state.assetsData.social_dominance_1w_percent_change > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={this.state.assetsData.social_dominance_1w_percent_change} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            <div className='prevData'><NumberFormat value={this.state.assetsData.social_dominance_1w_previous} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. 1w'}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='myPaper' elevation={3}>
                            <div className='titleSmall'>Summary</div>
                            <div dangerouslySetInnerHTML={{__html: this.coinMeta.short_summary}}></div><br/>
                            <div><a href={this.coinMeta.github_link}>Github</a></div>
                            <div><a href={this.coinMeta.whitepaper_link}>Whitepaper</a></div>
                            <div><a href={this.coinMeta.twitter_link}>Twitter</a></div>
                            <div><a href={this.coinMeta.reddit_link}>Reddit</a></div>
                            <div><a href={this.coinMeta.telegram_link}>Telegram</a></div><br/>
                            <div>View Details</div>
                        </Paper>
                    </Grid>
                </Grid>
                </Box>
            </div>
        );
    }
  
    componentDidMount(){
        fetch('https://api.lunarcrush.com/v2?data=assets&key=12jj7svid98m4xyvzmaalk4&data_points=0&change=1w&interval=week&symbol=' + this.coinMeta.symbol)
        .then(function(response) {
            return response.json();
        })
        .then(res => {
            var myData = res.data[0];
            this.setState({assetsData: myData});
        });
	}
}
export default CoinFinancialInfoBottom;