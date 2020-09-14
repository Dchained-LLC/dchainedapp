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
import ProgressBar from 'react-bootstrap/ProgressBar';

const volumeFormat = format(",.2~s");
const dateFormat = timeFormat("%b %d");

class GalaxyScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            coin: props.coin,
            range: props.range,
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
            subject: 'Price Score',
            score: this.state.globalData.price_score,
            fullScore: 5
        },{
            subject: 'Average Sentiment',
            score: this.state.globalData.average_sentiment,
            fullScore: 5
        },{
            subject: 'Social Impact Score',
            score: this.state.globalData.social_impact_score,
            fullScore: 5
        },{
            subject: 'Correlation Rank',
            score: this.state.globalData.correlation_rank,
            fullScore: 5
        }];

        return (
            <div>
                <Box component="div" mt={1} mb={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Galaxy Score™ Trend
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis yAxisId="gst" label={{ value: 'Galaxy Score™ Trend', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <YAxis yAxisId="price" orientation="right" label={{ value: 'Price', angle: -90, position: 'insideRight' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line yAxisId="gst" name="Galaxy Score™ Trend" type="monotone" dataKey="galaxy_score" stroke="#0000ff" dot={false} />
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
                                        <div><span className='score'>{this.state.globalData.galaxy_score}</span><span className='scoreTotal'>/100</span></div>
                                    </Grid>
                                </Grid>
                                <div><ProgressBar variant={this.state.globalData.galaxy_score > 50 ? 'info' : 'danger'} now={this.state.globalData.galaxy_score} /></div>
                                <div><strong>Higher scores</strong> <span>are better</span></div>
                                <Box component="div" style={{ width: '100%', height: 230 }} mt={1}>
                                    <ResponsiveContainer>
                                        <RadarChart data={radarData}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="subject">
                                                <Label dataKey="score" position="top" />
                                            </PolarAngleAxis>
                                            <PolarRadiusAxis domain={[0, 5]} />
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
                        Galaxy Score™ Components
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>          
                                    <Paper className='myPaperNoHover' elevation={3}>
                                        <Typography variant="h6" noWrap>
                                            Price Score
                                        </Typography>
                                        <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                            <ResponsiveContainer>
                                                <LineChart data={this.state.assetsData}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="1" vertical={false} />
                                                    <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                                    <YAxis yAxisId="prs" label={{ value: 'Price Score', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                                    <YAxis yAxisId="pr" orientation="right" label={{ value: 'Price', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ rigth: 0 }}/>
                                                    <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                                    <Legend />
                                                    <Line yAxisId="prs" name="Price Score" type="monotone" dataKey="price_score" stroke="#0000ff" dot={false} />
                                                    <Line yAxisId="pr" name="Price" type="monotone" dataKey="close" stroke="#ff0000" dot={false} />
                                                </LineChart>
                                            </ResponsiveContainer>  
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>          
                                    <Paper className='myPaperNoHover' elevation={3}>
                                        <Typography variant="h6" noWrap>
                                            Social Sentiment
                                        </Typography>
                                        <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                            <ResponsiveContainer>
                                                <LineChart data={this.state.assetsData}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="1" vertical={false} />
                                                    <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                                    <YAxis yAxisId="avg_sent" label={{ value: 'Social Sentiment', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                                    <YAxis yAxisId="ts2" orientation="right" label={{ value: 'Bearish Posts', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ rigth: 0 }}/>
                                                    <YAxis yAxisId="ts3" orientation="right" label={{ value: 'Neutral Posts', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ left: 10 }}/>
                                                    <YAxis yAxisId="ts4" orientation="right" label={{ value: 'Bullish Posts', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ left: 10 }}/>
                                                    <Tooltip formatter={(value, name) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                                    <Legend />
                                                    <Line yAxisId="avg_sent" name="Average Sentiment" type="monotone" dataKey="average_sentiment" stroke="#0000ff" dot={false} />
                                                    <Line yAxisId="ts2" name="Bearish Posts" type="monotone" dataKey="tweet_sentiment_impact2" stroke="#ff0000" dot={false} />
                                                    <Line yAxisId="ts3" name="Neutral Posts" type="monotone" dataKey="tweet_sentiment_impact3" stroke="#00ff00" dot={false} />
                                                    <Line yAxisId="ts4" name="Bullish Posts" type="monotone" dataKey="tweet_sentiment_impact4" stroke="#777777" dot={false} />
                                                </LineChart>
                                            </ResponsiveContainer>  
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>          
                                    <Paper className='myPaperNoHover' elevation={3}>
                                        <Typography variant="h6" noWrap>
                                            Social Impact
                                        </Typography>
                                        <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                            <ResponsiveContainer>
                                                <LineChart data={this.state.assetsData}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="1" vertical={false} />
                                                    <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                                    <YAxis yAxisId="si" label={{ value: 'Social Impact', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                                    <YAxis yAxisId="se" orientation="right" label={{ value: 'Social Engagement', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ rigth: 0 }}/>
                                                    <YAxis yAxisId="sv" orientation="right" label={{ value: 'Social Volume', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ left: 10 }}/>
                                                    <Tooltip formatter={(value, name) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                                    <Legend />
                                                    <Line yAxisId="si" name="Social Impact" type="monotone" dataKey="social_impact_score" stroke="#0000ff" dot={false} />
                                                    <Line yAxisId="sv" name="Social Engagement" type="monotone" dataKey="social_score" stroke="#ff0000" dot={false} />
                                                    <Line yAxisId="se" name="Social Volume" type="monotone" dataKey="social_volume_global" stroke="#00ff00" dot={false} />
                                                </LineChart>
                                            </ResponsiveContainer>  
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>          
                                    <Paper className='myPaperNoHover' elevation={3}>
                                        <Typography variant="h6" noWrap>
                                            Correlation Rank
                                        </Typography>
                                        <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                            <ResponsiveContainer>
                                                <LineChart data={this.state.assetsData}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="1" vertical={false} />
                                                    <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                                    <YAxis yAxisId="mv" label={{ value: 'Correlation Rank', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                                    <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                                    <Legend />
                                                    <Line yAxisId="mv" name="Correlation Rank" type="monotone" dataKey="correlation_rank" stroke="#0000ff" dot={false} />
                                                </LineChart>
                                            </ResponsiveContainer>  
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper className='myPaperNoHover' elevation={3}>
                                <div class="titleSmall">About Galaxy Score™</div>
                                <p>The Galaxy Score is a combined measure of cryptocurrency indicators used to correlate and understand the overall health, quality and performance of a specific project. In short, it indicates how well a coin is doing.</p>
                                <div class="titleSmall">How can it be used?</div>
                                <div>
                                    <p>The Galaxy Score can be used as a signal when a project is entering a new territory, from very bearish to very bullish. The overall score combines the total score of the following four key performance indicators:</p>
                                    <ul>
                                        <li>
                                            <strong>Price Score</strong> - A score we derive from a moving average that gives the coin some indication of upward or downward trend based solely on the market value.
                                        </li>
                                        <li>
                                            <strong>Social Sentiment</strong> - A percentage/score of the overall bullishness or bearishness of what people are saying online.
                                        </li>
                                        <li>
                                            <strong>Social Impact</strong> - A score of the volume/interaction/impact of social to give a sense of the size of the market or awareness of the coin.
                                        </li>
                                        <li>
                                            <strong>Correlation Rank</strong> - The algorithm that determines the correlation of our social data to the coin price/volume.
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
export default GalaxyScore;