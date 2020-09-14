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
        this.tabSelector = props.tabSelector;
        this.state = {
            assetsData: {},
            range: props.range
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
        var solcialVolume = this.state.assetsData.social_volume_global_1w;
        var solcialVolumePercentChange = this.state.assetsData.social_volume_1w_percent_change;
        var solcialVolumePrevious = this.state.assetsData.social_volume_global_1w_previous;

        var solcialEngagement = this.state.assetsData.social_score_1w;
        var solcialEngagementPercentChange = this.state.assetsData.social_score_1w_percent_change;
        var solcialEngagementPrevious = this.state.assetsData.social_score_1w_previous;

        var solcialSentiment = this.state.assetsData.average_sentiment_1w;
        var solcialSentimentPercentChange = this.state.assetsData.average_sentiment_1w_percent_change;
        var solcialSentimentPrevious = this.state.assetsData.average_sentiment_1w_previous;

        var solcialContributors = this.state.assetsData.social_contributors_1w;
        var solcialContributorsPercentChange = this.state.assetsData.social_contributors_1w_percent_change;
        var solcialContributorsPrevious = this.state.assetsData.ssocial_contributors_1w_previous;

        var newsVolume = this.state.assetsData.news_1w;
        var newsVolumePercentChange = this.state.assetsData.news_1w_percent_change;
        var newsVolumePrevious = this.state.assetsData.news_1w_previous;

        var spamVolume = this.state.assetsData.tweet_spam_1w;
        var spamVolumePercentChange = this.state.assetsData.tweet_spam_1w_percent_change;
        var spamVolumePrevious = this.state.assetsData.tweet_spam_1w_previous;

        var sharedLinks = this.state.assetsData.url_shares_1w;
        var sharedLinksPercentChange = this.state.assetsData.url_shares_1w_percent_change;
        var sharedLinksPrevious = this.state.assetsData.url_shares_1w_previous;

        var socialDominance = this.state.assetsData.social_dominance_1w;
        var socialDominancePercentChange = this.state.assetsData.social_dominance_1w_percent_change;
        var socialDominancePrevious = this.state.assetsData.social_dominance_1w_previous;
        
        if(this.state.range == '1D') {
            solcialVolume = this.state.assetsData.social_volume_global_1d;
            solcialVolumePercentChange = this.state.assetsData.social_volume_1d_percent_change;
            solcialVolumePrevious = this.state.assetsData.social_volume_global_1d_previous;

            solcialEngagement = this.state.assetsData.social_score_1d;
            solcialEngagementPercentChange = this.state.assetsData.social_score_1d_percent_change;
            solcialEngagementPrevious = this.state.assetsData.social_score_1d_previous;

            solcialSentiment = this.state.assetsData.average_sentiment_1d;
            solcialSentimentPercentChange = this.state.assetsData.average_sentiment_1d_percent_change;
            solcialSentimentPrevious = this.state.assetsData.average_sentiment_1d_previous;

            solcialContributors = this.state.assetsData.social_contributors_1d;
            solcialContributorsPercentChange = this.state.assetsData.social_contributors_1d_percent_change;
            solcialContributorsPrevious = this.state.assetsData.ssocial_contributors_1d_previous;

            newsVolume = this.state.assetsData.news_1d;
            newsVolumePercentChange = this.state.assetsData.news_1d_percent_change;
            newsVolumePrevious = this.state.assetsData.news_1d_previous;

            spamVolume = this.state.assetsData.tweet_spam_1d;
            spamVolumePercentChange = this.state.assetsData.tweet_spam_1d_percent_change;
            spamVolumePrevious = this.state.assetsData.tweet_spam_1d_previous;

            sharedLinks = this.state.assetsData.url_shares_1d;
            sharedLinksPercentChange = this.state.assetsData.url_shares_1d_percent_change;
            sharedLinksPrevious = this.state.assetsData.url_shares_1d_previous;

            socialDominance = this.state.assetsData.social_dominance_1d;
            socialDominancePercentChange = this.state.assetsData.social_dominance_1d_percent_change;
            socialDominancePrevious = this.state.assetsData.social_dominance_1d_previous;  
        }
        else if(this.state.range == '1M') {
            solcialVolume = this.state.assetsData.social_volume_global_1m;
            solcialVolumePercentChange = this.state.assetsData.social_volume_1m_percent_change;
            solcialVolumePrevious = this.state.assetsData.social_volume_global_1m_previous;

            solcialEngagement = this.state.assetsData.social_score_1m;
            solcialEngagementPercentChange = this.state.assetsData.social_score_1m_percent_change;
            solcialEngagementPrevious = this.state.assetsData.social_score_1m_previous;

            solcialSentiment = this.state.assetsData.average_sentiment_1m;
            solcialSentimentPercentChange = this.state.assetsData.average_sentiment_1m_percent_change;
            solcialSentimentPrevious = this.state.assetsData.average_sentiment_1m_previous;

            solcialContributors = this.state.assetsData.social_contributors_1m;
            solcialContributorsPercentChange = this.state.assetsData.social_contributors_1m_percent_change;
            solcialContributorsPrevious = this.state.assetsData.ssocial_contributors_1m_previous;

            newsVolume = this.state.assetsData.news_1m;
            newsVolumePercentChange = this.state.assetsData.news_1m_percent_change;
            newsVolumePrevious = this.state.assetsData.news_1m_previous;

            spamVolume = this.state.assetsData.tweet_spam_1m;
            spamVolumePercentChange = this.state.assetsData.tweet_spam_1m_percent_change;
            spamVolumePrevious = this.state.assetsData.tweet_spam_1m_previous;

            sharedLinks = this.state.assetsData.url_shares_1m;
            sharedLinksPercentChange = this.state.assetsData.url_shares_1m_percent_change;
            sharedLinksPrevious = this.state.assetsData.url_shares_1m_previous;

            socialDominance = this.state.assetsData.social_dominance_1m;
            socialDominancePercentChange = this.state.assetsData.social_dominance_1m_percent_change;
            socialDominancePrevious = this.state.assetsData.social_dominance_1m_previous;  
        }
        else if(this.state.range == '3M') {
            solcialVolume = this.state.assetsData.social_volume_global_3m;
            solcialVolumePercentChange = this.state.assetsData.social_volume_3m_percent_change;
            solcialVolumePrevious = this.state.assetsData.social_volume_global_3m_previous;

            solcialEngagement = this.state.assetsData.social_score_3m;
            solcialEngagementPercentChange = this.state.assetsData.social_score_3m_percent_change;
            solcialEngagementPrevious = this.state.assetsData.social_score_3m_previous;

            solcialSentiment = this.state.assetsData.average_sentiment_3m;
            solcialSentimentPercentChange = this.state.assetsData.average_sentiment_3m_percent_change;
            solcialSentimentPrevious = this.state.assetsData.average_sentiment_3m_previous;

            solcialContributors = this.state.assetsData.social_contributors_3m;
            solcialContributorsPercentChange = this.state.assetsData.social_contributors_3m_percent_change;
            solcialContributorsPrevious = this.state.assetsData.ssocial_contributors_3m_previous;

            newsVolume = this.state.assetsData.news_3m;
            newsVolumePercentChange = this.state.assetsData.news_3m_percent_change;
            newsVolumePrevious = this.state.assetsData.news_3m_previous;

            spamVolume = this.state.assetsData.tweet_spam_3m;
            spamVolumePercentChange = this.state.assetsData.tweet_spam_3m_percent_change;
            spamVolumePrevious = this.state.assetsData.tweet_spam_3m_previous;

            sharedLinks = this.state.assetsData.url_shares_3m;
            sharedLinksPercentChange = this.state.assetsData.url_shares_3m_percent_change;
            sharedLinksPrevious = this.state.assetsData.url_shares_3m_previous;

            socialDominance = this.state.assetsData.social_dominance_3m;
            socialDominancePercentChange = this.state.assetsData.social_dominance_3m_percent_change;
            socialDominancePrevious = this.state.assetsData.social_dominance_3m_previous;  
        }
        else if(this.state.range == '6M') {
            solcialVolume = this.state.assetsData.social_volume_global_6m;
            solcialVolumePercentChange = this.state.assetsData.social_volume_6m_percent_change;
            solcialVolumePrevious = this.state.assetsData.social_volume_global_6m_previous;

            solcialEngagement = this.state.assetsData.social_score_6m;
            solcialEngagementPercentChange = this.state.assetsData.social_score_6m_percent_change;
            solcialEngagementPrevious = this.state.assetsData.social_score_6m_previous;

            solcialSentiment = this.state.assetsData.average_sentiment_6m;
            solcialSentimentPercentChange = this.state.assetsData.average_sentiment_6m_percent_change;
            solcialSentimentPrevious = this.state.assetsData.average_sentiment_6m_previous;

            solcialContributors = this.state.assetsData.social_contributors_6m;
            solcialContributorsPercentChange = this.state.assetsData.social_contributors_6m_percent_change;
            solcialContributorsPrevious = this.state.assetsData.ssocial_contributors_6m_previous;

            newsVolume = this.state.assetsData.news_1w;
            newsVolumePercentChange = this.state.assetsData.news_6m_percent_change;
            newsVolumePrevious = this.state.assetsData.news_6m_previous;

            spamVolume = this.state.assetsData.tweet_spam_6m;
            spamVolumePercentChange = this.state.assetsData.tweet_spam_6m_percent_change;
            spamVolumePrevious = this.state.assetsData.tweet_spam_6m_previous;

            sharedLinks = this.state.assetsData.url_shares_6m;
            sharedLinksPercentChange = this.state.assetsData.url_shares_6m_percent_change;
            sharedLinksPrevious = this.state.assetsData.url_shares_6m_previous;

            socialDominance = this.state.assetsData.social_dominance_6m;
            socialDominancePercentChange = this.state.assetsData.social_dominance_6m_percent_change;
            socialDominancePrevious = this.state.assetsData.social_dominance_6m_previous;  
        }
        else if(this.state.range == '1Y') {
            solcialVolume = this.state.assetsData.social_volume_global_1y;
            solcialVolumePercentChange = this.state.assetsData.social_volume_1y_percent_change;
            solcialVolumePrevious = this.state.assetsData.social_volume_global_1y_previous;

            solcialEngagement = this.state.assetsData.social_score_1y;
            solcialEngagementPercentChange = this.state.assetsData.social_score_1y_percent_change;
            solcialEngagementPrevious = this.state.assetsData.social_score_1y_previous;

            solcialSentiment = this.state.assetsData.average_sentiment_1y;
            solcialSentimentPercentChange = this.state.assetsData.average_sentiment_1y_percent_change;
            solcialSentimentPrevious = this.state.assetsData.average_sentiment_1y_previous;

            solcialContributors = this.state.assetsData.social_contributors_1y;
            solcialContributorsPercentChange = this.state.assetsData.social_contributors_1y_percent_change;
            solcialContributorsPrevious = this.state.assetsData.ssocial_contributors_1y_previous;

            newsVolume = this.state.assetsData.news_1y;
            newsVolumePercentChange = this.state.assetsData.news_1y_percent_change;
            newsVolumePrevious = this.state.assetsData.news_1y_previous;

            spamVolume = this.state.assetsData.tweet_spam_1y;
            spamVolumePercentChange = this.state.assetsData.tweet_spam_1y_percent_change;
            spamVolumePrevious = this.state.assetsData.tweet_spam_1y_previous;

            sharedLinks = this.state.assetsData.url_shares_1y;
            sharedLinksPercentChange = this.state.assetsData.url_shares_1y_percent_change;
            sharedLinksPrevious = this.state.assetsData.url_shares_1y_previous;

            socialDominance = this.state.assetsData.social_dominance_1y;
            socialDominancePercentChange = this.state.assetsData.social_dominance_1y_percent_change;
            socialDominancePrevious = this.state.assetsData.social_dominance_1y_previous;  
        }


        return (
            <div>
                <CssBaseline />
                <Box component="div">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className='myPaper' elevation={3} onClick={() => this.tabSelector(1)}>
                            <Grid container spacing={1}>
                                <Grid item xs={11}>
                                    <div className='titleBig'>Galaxy Score™</div>
                                </Grid>
                                <Grid item xs={1}>
                                    <div className='information'>
                                        <InfoOutlinedIcon color="disabled"/>
                                        <div className='myTooltip'>The Galaxy Score measures a coin's performance VS. itself over time and how it is trending over the last 50 hours. In general it indicates how healthy a coin is by looking at combined performance indicators across markets and deep social engagement. Scores over 50 are generally bullish while scores less than 50 are generally bearish.</div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={2}>
                                    <span className='galaxyScore'><img style={{ width: 25, height: 25, position: "relative", top: '13px' }} src={require('./assets/galaxy-icon.svg')}/></span>
                                </Grid>
                                <Grid item xs={10}>
                                    <div><span className='score'>{this.state.assetsData.galaxy_score}</span><span className='scoreTotal'>/100</span></div>
                                </Grid>
                            </Grid>
                            <div><ProgressBar variant={this.state.assetsData.galaxy_score > 50 ? 'info' : 'danger'} now={this.state.assetsData.galaxy_score} /></div>
                            <div><strong>Higher scores</strong> <span>are better</span></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='myPaper' elevation={3} onClick={() => this.tabSelector(2)}>
                            <Grid container spacing={1}>
                                <Grid item xs={11}>
                                    <div className='titleBig'>AltRank™</div>
                                </Grid>
                                <Grid item xs={1}>
                                    <div className='information'>
                                        <InfoOutlinedIcon color="disabled"/>
                                        <div className='myTooltip'>AltRank™ measures a coin's performance VS. all other coins that we actively support. In general it is a unique measurement that combines ALT coin price performance relative to Bitcoin and other social activity indicators across the entire crypto market. A coin can have a high AltRank™ or 1 even in a bear market situation.</div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={2}>
                                    <span className='altRank'><img style={{ width: 25, height: 25, position: "relative", top: '13px' }} src={require('./assets/trophy-icon.svg')}/></span>
                                </Grid>
                                <Grid item xs={6}>
                                    <div><span className='score'>{this.state.assetsData.alt_rank}</span><span className='scoreTotal'>/{this.totalCoins}</span></div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className='rankChange'>24 hour change<br/>{(this.state.assetsData.alt_rank_calc_24h_previous - this.state.assetsData.alt_rank) > 0 ? <ArrowDropUpTwoToneIcon fontSize="large" style={{ color: green[500] }}/>: <ArrowDropDownTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <span style={{color: ((this.state.assetsData.alt_rank_calc_24h_previous - this.state.assetsData.alt_rank) > 0 ? 'green' : 'red')}}>{(this.state.assetsData.alt_rank_calc_24h_previous - this.state.assetsData.alt_rank)} spots</span></div>
                                </Grid>
                            </Grid>
                            <div><strong>Lower ranks</strong> <span>are better</span></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3} onClick={() => this.tabSelector(3)}>
                            <Grid container spacing={1}>
                                <Grid item xs={10}>
                                    <div className='titleSmall'>Social Volume</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='information'>
                                        <InfoOutlinedIcon color="disabled"/>
                                        <div className='myTooltip'>Combined Social Volume is the total volume of social posts across all data sources.</div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className='theContent'>
                                <div className='value'><NumberFormat value={solcialVolume} displayType={'text'} thousandSeparator={true} suffix={' Posts'}/></div>
                                <div style={{color: (solcialVolumePercentChange > 0 ? 'green' : 'red')}}>{solcialVolumePercentChange > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={solcialVolumePercentChange} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            </div>
                            <div className='prevData'><NumberFormat value={solcialVolumePrevious} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. ' + this.state.range.toLowerCase()}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3} onClick={() => this.tabSelector(3)}>
                            <Grid container spacing={1}>
                                <Grid item xs={10}>
                                    <div className='titleSmall'>Social Engagement</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='information'>
                                        <InfoOutlinedIcon color="disabled"/>
                                        <div className='myTooltip'>Social Engagement measures total social activity and includes upvotes, favs, retweets, replies and followers.</div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className='theContent'>
                                <div className='value'><NumberFormat value={solcialEngagement} displayType={'text'} thousandSeparator={true}/></div>
                                <div style={{color: (solcialEngagementPercentChange > 0 ? 'green' : 'red')}}>{solcialEngagementPercentChange > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={solcialEngagementPercentChange} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            </div>
                            <div className='prevData'><NumberFormat value={solcialEngagementPrevious} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. ' + this.state.range.toLowerCase()}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3} onClick={() => this.tabSelector(3)}>
                            <Grid container spacing={1}>
                                <Grid item xs={10}>
                                    <div className='titleSmall'>Social Sentiment</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='information'>
                                        <InfoOutlinedIcon color="disabled"/>
                                        <div className='myTooltip'>Social Sentiment is organized 0-100% (bearish to bullish), and is a score of the overall sentiment across all collected posts.</div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className='theContent'>
                                <div className='value'><NumberFormat value={(solcialSentiment -1) * 25} displayType={'text'} thousandSeparator={true} decimalScale={2} suffix={this.state.assetsData.average_sentiment_1w > 3 ? '% Bullish' : '% Bearish'}/></div>
                                <div style={{color: (solcialSentimentPercentChange > 0 ? 'green' : 'red')}}>{solcialSentimentPercentChange > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={solcialSentimentPercentChange} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            </div>
                            <div className='prevData'><NumberFormat value={(solcialSentimentPrevious -1) * 25} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'% prev. ' + this.state.range.toLowerCase()}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3} onClick={() => this.tabSelector(3)}>
                            <Grid container spacing={1}>
                                <Grid item xs={10}>
                                    <div className='titleSmall'>Social Contributors</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='information'>
                                        <InfoOutlinedIcon color="disabled"/>
                                        <div className='myTooltip'>Social contributors is the average number of social media contributors per hour over a 24-hour period.</div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className='theContent'>
                                <div className='value'><NumberFormat value={solcialContributors} displayType={'text'} thousandSeparator={true} suffix={' Per Hour'}/></div>
                                <div style={{color: (solcialContributorsPercentChange > 0 ? 'green' : 'red')}}>{solcialContributorsPercentChange > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={solcialContributorsPercentChange} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            </div>
                            <div className='prevData'><NumberFormat value={solcialContributorsPrevious} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. ' + this.state.range.toLowerCase()}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3} onClick={() => this.tabSelector(3)}>
                            <Grid container spacing={1}>
                                <Grid item xs={10}>
                                    <div className='titleSmall'>News Volume</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='information'>
                                        <InfoOutlinedIcon color="disabled"/>
                                        <div className='myTooltip'>News Volume displays news articles over specified time intervals, collected per coin.</div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className='theContent'>
                                <div className='value'><NumberFormat value={newsVolume} displayType={'text'} thousandSeparator={true} suffix={' Articles'}/></div>
                                <div style={{color: (newsVolumePercentChange > 0 ? 'green' : 'red')}}>{newsVolumePercentChange > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={newsVolumePercentChange} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            </div>
                            <div className='prevData'><NumberFormat value={newsVolumePrevious} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. ' + this.state.range.toLowerCase()}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3} onClick={() => this.tabSelector(3)}>
                            <Grid container spacing={1}>
                                <Grid item xs={10}>
                                    <div className='titleSmall'>Spam Volume</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='information'>
                                        <InfoOutlinedIcon color="disabled"/>
                                        <div className='myTooltip'>Spam Volume highlights bot or repetitive shilling activity on a coin. Our AI is tuned to capture as much spam as possible as it's collected.</div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className='theContent'>
                                <div className='value'><NumberFormat value={spamVolume} displayType={'text'} thousandSeparator={true} suffix={' Items'}/></div>
                                <div style={{color: (spamVolumePercentChange > 0 ? 'green' : 'red')}}>{spamVolumePercentChange > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={spamVolumePercentChange} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            </div>
                            <div className='prevData'><NumberFormat value={spamVolumePrevious} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. ' + this.state.range.toLowerCase()}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3} onClick={() => this.tabSelector(3)}>
                            <Grid container spacing={1}>
                                <Grid item xs={10}>
                                    <div className='titleSmall'>Shared Links</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='information'>
                                        <InfoOutlinedIcon color="disabled"/>
                                        <div className='myTooltip'>Popularity and activity of all shared liknks across all collected sources during selected time periods.</div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className='theContent'>
                                <div className='value'><NumberFormat value={sharedLinks} displayType={'text'} thousandSeparator={true} suffix={' URLs'}/></div>
                                <div style={{color: (sharedLinksPercentChange > 0 ? 'green' : 'red')}}>{sharedLinksPercentChange > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={sharedLinksPercentChange} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            </div>
                            <div className='prevData'><NumberFormat value={sharedLinksPrevious} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. ' + this.state.range.toLowerCase()}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='myPaper' elevation={3} onClick={() => this.tabSelector(3)}>
                            <Grid container spacing={1}>
                                <Grid item xs={10}>
                                    <div className='titleSmall'>Social Dominance</div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className='information'>
                                        <InfoOutlinedIcon color="disabled"/>
                                        <div className='myTooltip'>Social Dominance is a measurement of all social media volume a coin has compared to the market as a whole.</div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className='theContent'>
                                <div className='value'><NumberFormat value={socialDominance} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                                <div style={{color: (socialDominancePercentChange > 0 ? 'green' : 'red')}}>{socialDominancePercentChange > 0 ? <ArrowUpwardTwoToneIcon fontSize="large" style={{ color: green[500] }}/> : <ArrowDownwardTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <NumberFormat value={socialDominancePercentChange} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'}/></div>
                            </div>
                            <div className='prevData'><NumberFormat value={socialDominancePrevious} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={' prev. ' + this.state.range.toLowerCase()}/></div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className='myPaper' elevation={3}>
                            <div className='titleSmall'>Summary</div>
                            <div className='shortDescription' dangerouslySetInnerHTML={{__html: this.coinMeta.short_summary}}></div><br/>
                            {this.coinMeta.github_link ? <div><a href={this.coinMeta.github_link}>Github</a></div> : '' }
                            {this.coinMeta.whitepaper_link ? <div><a href={this.coinMeta.whitepaper_link}>Whitepaper</a></div> : '' }
                            {this.coinMeta.twitter_link ? <div><a href={this.coinMeta.twitter_link}>Twitter</a></div> : '' }
                            {this.coinMeta.reddit_link ? <div><a href={this.coinMeta.reddit_link}>Reddit</a></div> : '' }
                            {this.coinMeta.telegram_link ? <div><a href={this.coinMeta.telegram_link}>Telegram</a></div> : '' }
                            <div className='viewDetailsButton' onClick={() => this.tabSelector(5)}>View Details</div>
                        </Paper>
                    </Grid>
                </Grid>
                </Box>
            </div>
        );
    }
  
    componentDidMount(){
        fetch('https://api.lunarcrush.com/v2?data=assets&key=12jj7svid98m4xyvzmaalk4&data_points=0&change=' + this.state.range.toLowerCase() + '&symbol=' + this.coinMeta.symbol)
        .then(function(response) {
            return response.json();
        })
        .then(res => {
            var myData = res.data[0];
            this.setState({assetsData: myData});
        });
    }
    
    componentDidUpdate (prevProps, prevState) {
        if(prevState.range != this.props.range) {
            fetch('https://api.lunarcrush.com/v2?data=assets&key=12jj7svid98m4xyvzmaalk4&data_points=0&change=' + this.props.range.toLowerCase() + '&symbol=' + this.coinMeta.symbol)
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
export default CoinFinancialInfoBottom;