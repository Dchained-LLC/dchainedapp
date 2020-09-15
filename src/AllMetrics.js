import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer, Cell } from 'recharts';
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

const volumeFormat = format(".2s");
const dateFormat = timeFormat("%b %d");

class AllMetrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            coin: props.coin,
            range: props.range,
            assetsData: []
        }
    }

    render() {
        if(this.state.loading) {
            return(<div>Loading...</div>);
        }

        const formatter = (value) => `${volumeFormat(value)}`;
        const dateFormatter = (value) => `${dateFormat(new Date(value * 1000))}`;

        let getRedditPostsComments = (x)=>{return x.reddit_posts + x.reddit_comments;}

        return (
            <div>
                <Box component="div" mt={1} mb={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Combined Social Volume
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Combined Social Volume', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Combined Social Volume" type="monotone" dataKey="social_volume_global" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Social Engagement
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Social Engagement', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Social Engagement" type="monotone" dataKey="social_score" stroke="#8884d8" dot={false} />
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
                                            <YAxis yAxisId="ts2" orientation="right" label={{ value: 'Posts', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ rigth: 0 }}/>
                                            <Tooltip formatter={(value, name) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line yAxisId="avg_sent" name="Average Sentiment" type="monotone" dataKey="average_sentiment" stroke="#0000ff" dot={false} />
                                            <Line yAxisId="ts2" name="Bearish Posts" type="monotone" dataKey="tweet_sentiment_impact2" stroke="#ff0000" dot={false} />
                                            <Line yAxisId="ts2" name="Neutral Posts" type="monotone" dataKey="tweet_sentiment_impact3" stroke="#00ff00" dot={false} />
                                            <Line yAxisId="ts2" name="Bullish Posts" type="monotone" dataKey="tweet_sentiment_impact4" stroke="#777777" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Twitter Post Volume
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Twitter Post Volume', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Twitter Post Volume" type="monotone" dataKey="tweets" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Twitter Favorites
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Twitter Favorites', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Twitter Favorites" type="monotone" dataKey="tweet_favorites" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Twitter Quotes
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Twitter Quotes', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Twitter Quotes" type="monotone" dataKey="tweet_quotes" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Twitter Replies
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Twitter Replies', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Twitter Replies" type="monotone" dataKey="tweet_replies" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Twitter Retweets
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Twitter Retweets', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Twitter Retweets" type="monotone" dataKey="tweet_retweets" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Reddit Post & Comment Volume
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Reddit Post & Comment Volume', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Reddit Post & Comment Volume" type="monotone" dataKey={getRedditPostsComments} stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Youtube Volume
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Youtube Volume', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Youtube Volume" type="monotone" dataKey="youtube" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Medium Volume
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Medium Volume', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line connectNulls name="Medium Volume" type="monotone" dataKey="medium" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    News
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'News', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="News" type="monotone" dataKey="news" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Spam
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Spam', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Spam" type="monotone" dataKey="tweet_spam" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Shared Links
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Shared Links', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Shared Links" type="monotone" dataKey="unique_url_shares" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Social Dominance %
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Social Dominance %', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Social Dominance %" type="monotone" dataKey="social_dominance" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Social Contributors
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Social Contributors', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Social Contributors" type="monotone" dataKey="social_contributors" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Market Dominance %
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis label={{ value: 'Market Dominance %', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line name="Market Dominance %" type="monotone" dataKey="market_dominance" stroke="#8884d8" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>          
                            <Paper className='myPaperNoHover' elevation={3}>
                                <Typography variant="h6" noWrap>
                                    Market Cap
                                </Typography>
                                <Box component="div" style={{ width: '100%', height: 350 }} mt={1}>
                                    <ResponsiveContainer>
                                        <LineChart data={this.state.assetsData}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="1" vertical={false} />
                                            <XAxis dataKey="time" tickFormatter={dateFormatter} minTickGap={10}/>
                                            <YAxis yAxisId="mc" label={{ value: 'Market Cap', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <YAxis yAxisId="mcr" orientation="right" label={{ value: 'Market Cap Rank', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ rigth: 0 }}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line yAxisId="mc" name="Market Cap" type="monotone" dataKey="market_cap" stroke="#0000ff" dot={false} />
                                            <Line yAxisId="mcr" name="Market Cap Rank" type="monotone" dataKey="market_cap_rank" stroke="#ff0000" dot={false} />
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
                                            <YAxis yAxisId="mv" label={{ value: 'Market Volume', angle: -90, position: 'insideBottomLeft' }} tickFormatter={formatter}/>
                                            <YAxis yAxisId="mvr" orientation="right" label={{ value: 'Market Volume 24h Rank', angle: -90, position: 'insideRight' }} tickFormatter={formatter} padding={{ rigth: 0 }}/>
                                            <Tooltip formatter={(value) => formatter(value)} labelFormatter={(value) => dateFormatter(value)}/>
                                            <Legend />
                                            <Line yAxisId="mv" name="Market Volume" type="monotone" dataKey="volume" stroke="#0000ff" dot={false} />
                                            <Line yAxisId="mvr" name="Market Volume 24h Rank" type="monotone" dataKey="volume_24h_rank" stroke="#ff0000" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>  
                                </Box>
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
            this.setState({assetsData: myData, loading: false});
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
                this.setState({range: this.props.range, assetsData: myData});
            });
        }
    }
}
export default AllMetrics;