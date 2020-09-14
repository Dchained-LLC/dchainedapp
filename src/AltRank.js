import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, 
    ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
    Radar, Label } from 'recharts';
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { green, red } from '@material-ui/core/colors';
import ArrowUpwardTwoToneIcon from '@material-ui/icons/ArrowUpwardTwoTone';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';
import ArrowDropUpTwoToneIcon from '@material-ui/icons/ArrowDropUpTwoTone';

const volumeFormat = format(",.2~s");
const dateFormat = timeFormat("%b %d");

class AltRank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            coin: props.coin,
            range: props.range,
            totalCoins: props.totalCoins,
            assetsData: [],
            globalData: []
        }
    }

    render() {
        if(this.state.loading) {
            return(<div>Loading...</div>);
        }

        const formatter = (value) => `${volumeFormat(value)}`;
        const dateFormatter = (value) => `${dateFormat(new Date(value * 1000))}`;

        var radarData = [{
            subject: 'Volume 24h Rank',
            score: this.state.globalData.volume_24h_rank,
            fullScore: this.state.totalCoins
        },{
            subject: '% Change 24h Rank',
            score: this.state.globalData.percent_change_24h_rank,
            fullScore: this.state.totalCoins
        },{
            subject: 'Social Score 24h Rank',
            score: this.state.globalData.social_score_24h_rank,
            fullScore: this.state.totalCoins
        },{
            subject: 'Social Volume 24h Rank',
            score: this.state.globalData.social_volume_24h_rank,
            fullScore: this.state.totalCoins
        }];

        return (
            <div>
                <Box component="div" mt={1} mb={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    AltRank™ Trend
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis yAxisId="alt" label={{ value: 'AltRank™ Trend', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <YAxis yAxisId="price" orientation="right" label={{ value: 'Price', angle: -90, position: 'insideRight' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line yAxisId="alt" name="AltRank™ Trend" type="monotone" dataKey="alt_rank" stroke="#0000ff" dot={false} />
                                            <Line yAxisId="price" name="Price" type="monotone" dataKey="close" stroke="#ff0000" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>          
                            <Paper className='myPaperNoHover' elevation={3}>
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
                                        <div><span className='score'>{this.state.globalData.alt_rank}</span><span className='scoreTotal'>/{this.state.totalCoins}</span></div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className='rankChange'>24 hour change<br/>{(this.state.globalData.alt_rank_calc_24h_previous - this.state.globalData.alt_rank) > 0 ? <ArrowDropUpTwoToneIcon fontSize="large" style={{ color: green[500] }}/>: <ArrowDropDownTwoToneIcon fontSize="large" style={{ color: red[500] }}/>} <span style={{color: ((this.state.globalData.alt_rank_calc_24h_previous - this.state.assetsData.alt_rank) > 0 ? 'green' : 'red')}}>{(this.state.globalData.alt_rank_calc_24h_previous - this.state.globalData.alt_rank)} spots</span></div>
                                    </Grid>
                                </Grid>
                                <div><strong>Lower ranks</strong> <span>are better</span></div>
                                <Box component="div" style={{ width: '100%', height: 230 }} mt={1}>
                                    <ResponsiveContainer>
                                        <RadarChart data={radarData}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="subject">
                                                <Label dataKey="score" position="top" />
                                            </PolarAngleAxis>
                                            <PolarRadiusAxis reversed domain={[0, this.state.totalCoins]} tickCount={3}/>
                                            <Radar dataKey="score" stroke="#0000ff" fillOpacity={0} dot={true} />
                                            <Tooltip />
                                        </RadarChart>  
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
                <Box component="div" mt={1} mb={2}>
                    <Typography variant="h6" noWrap>
                        AltRank™ Components
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>          
                                    <Paper className='myPaperNoHover' elevation={3}>
                                        <Typography variant="h6" noWrap>
                                            Percent Change 24h
                                        </Typography>
                                        <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                            <ResponsiveContainer>
                                                <LineChart data={this.state.assetsData}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="1" vertical={false} />
                                                    <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                                    <YAxis yAxisId="prs" label={{ value: 'Percent Change 24h', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                                    <YAxis yAxisId="pr" orientation="right" label={{ value: 'Percent Change 24h Rank', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ rigth: 0 }}/>
                                                    <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                                    <Legend />
                                                    <Line yAxisId="prs" name="Percent Change 24h" type="monotone" dataKey="percent_change_24h" stroke="#0000ff" dot={false} />
                                                    <Line yAxisId="pr" name="Percent Change 24h Rank" type="monotone" dataKey="percent_change_24h_rank" stroke="#ff0000" dot={false} />
                                                </LineChart>
                                            </ResponsiveContainer>  
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>          
                                    <Paper className='myPaperNoHover' elevation={3}>
                                        <Typography variant="h6" noWrap>
                                            Market Volume
                                        </Typography>
                                        <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                            <ResponsiveContainer>
                                                <LineChart data={this.state.assetsData}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="1" vertical={false} />
                                                    <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                                    <YAxis yAxisId="avg_sent" label={{ value: 'Market Volume', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                                    <YAxis yAxisId="ts2" orientation="right" label={{ value: ' Market Volume 24h Rank', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ rigth: 0 }}/>
                                                    <Tooltip formatter={(value, name) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                                    <Legend />
                                                    <Line yAxisId="avg_sent" name="Market Volume" type="monotone" dataKey="volume" stroke="#0000ff" dot={false} />
                                                    <Line yAxisId="ts2" name="Market Volume 24h Rank" type="monotone" dataKey="volume_24h_rank" stroke="#ff0000" dot={false} />
                                                </LineChart>
                                            </ResponsiveContainer>  
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>          
                                    <Paper className='myPaperNoHover' elevation={3}>
                                        <Typography variant="h6" noWrap>
                                            Social Volume
                                        </Typography>
                                        <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                            <ResponsiveContainer>
                                                <LineChart data={this.state.assetsData}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="1" vertical={false} />
                                                    <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                                    <YAxis yAxisId="si" label={{ value: 'Social Volume', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                                    <YAxis yAxisId="se" orientation="right" label={{ value: 'Social Volume 24h Rank', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ rigth: 0 }}/>
                                                    <Tooltip formatter={(value, name) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                                    <Legend />
                                                    <Line yAxisId="si" name="Social Volume" type="monotone" dataKey="social_volume" stroke="#0000ff" dot={false} />
                                                    <Line yAxisId="se" name="Social Volume 24h Rank" type="monotone" dataKey="social_volume_24h_rank" stroke="#ff0000" dot={false} />
                                                </LineChart>
                                            </ResponsiveContainer>  
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>          
                                    <Paper className='myPaperNoHover' elevation={3}>
                                        <Typography variant="h6" noWrap>
                                            Social Score
                                        </Typography>
                                        <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                            <ResponsiveContainer>
                                                <LineChart data={this.state.assetsData}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="1" vertical={false} />
                                                    <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                                    <YAxis yAxisId="si" label={{ value: 'Social Score', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                                    <YAxis yAxisId="se" orientation="right" label={{ value: 'Social Score 24h Rank', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ rigth: 0 }}/>
                                                    <Tooltip formatter={(value, name) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                                    <Legend />
                                                    <Line yAxisId="si" name="Social Score" type="monotone" dataKey="social_score" stroke="#0000ff" dot={false} />
                                                    <Line yAxisId="se" name="Social Score 24h Rank" type="monotone" dataKey="social_score_24h_rank" stroke="#ff0000" dot={false} />
                                                </LineChart>
                                            </ResponsiveContainer>  
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper className='myPaperNoHover' elevation={3}>
                                <div class="titleSmall">About AltRank™</div>
                                <p>AltRank is a proprietary measurement combining altcoin price performance relative to Bitcoin along with measuring the difference in social activity indicators between all coins. This combined metric seeks to provide a broader view of the health and performance of altcoins.</p>
                                <div class="titleSmall">How can it be used?</div>
                                <div>
                                    <p>AltRank looks at both financial metrics alongside community metrics and seeks to identify altcoins that outperform Bitcoin during specific timeframes. There’s four main factors that go into the AltRank:</p>
                                    <ul>
                                        <li>
                                            <strong>Price Change</strong> - AltRank compares the price performance of an altcoin relative to Bitcoin price performance. Performance is calculated over specific timeframes and updates every 5 minutes.
                                        </li>
                                        <li>
                                            <strong>Trading Volume</strong> - There’s a lot of altcoins. If there’s little trading volume, they’re incredibly hard to trade profitably and accurately. AltRank looks at the trading volume of each coin and ranks altcoins from highest to lowest trading activity.
                                        </li>
                                        <li>
                                            <strong>Social Volume</strong> - As we like to say, “without community there is no crypto.” Social volume is a key factor in determining if a coin has credibility. Layering in social activity from multiple channels such as Twitter, Reddit, shared links, news sources and more provides a view into the community size of an altcoin. When layering this information on top of price, AltRank provides some incredible results.
                                        </li>
                                        <li>
                                            <strong>Social Score</strong> - AltRank dives deep into social activity looking at likes, shares, comments, followers, and more across multiple social channels. This is key to determining how much engagement the community has across posted content…and if it’s from an actual human.
                                        </li>
                                    </ul>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        );
    }

    getCriteria = (newRange) => {
        var interval = 'hour';
        var numOfPoints = 168;
    
        if(this.state.range == '1D') {
          interval = 'hour';
          numOfPoints = 24;
        }
        else if(this.state.range == '1M') {
          interval = 'day';
          numOfPoints = 30;
        }
        else if(this.state.range == '3M') {
          interval = 'day';
          numOfPoints = 90;
        }
        else if(this.state.range == '6M') {
          interval = 'day';
          numOfPoints = 180;
        }
        else if(this.state.range == '1Y') {
          interval = 'day';
          numOfPoints = 365;
        }
    
        return {interval, numOfPoints};
    }
  
    componentDidMount(){
        var {interval, numOfPoints } = this.getCriteria(this.state.range);

        fetch('https://api.lunarcrush.com/v2?data=assets&key=12jj7svid98m4xyvzmaalk4&data_points=' + numOfPoints + '&interval=' + interval + '&symbol=' + this.state.coin)
        .then(function(response) {
            return response.json();
        })
        .then(res => {
            var myData = res.data[0].timeSeries;
            var myGlobalData = res.data[0];
            this.setState({assetsData: myData, globalData: myGlobalData, loading: false});
        });
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.range != this.props.range) {
            var {interval, numOfPoints } = this.getCriteria(this.state.range);

            fetch('https://api.lunarcrush.com/v2?data=assets&key=12jj7svid98m4xyvzmaalk4&data_points=' + numOfPoints + '&interval=' + interval + '&symbol=' + this.state.coin)
            .then(function(response) {
                return response.json();
            })
            .then(res => {
                var myData = res.data[0].timeSeries;
                var myGlobalData = res.data[0];
                this.setState({range: this.props.range, assetsData: myData, globalData: myGlobalData});
            });
        }
    }
}
export default AltRank;