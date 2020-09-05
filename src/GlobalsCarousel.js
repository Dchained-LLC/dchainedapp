import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import LineChart from 'react-svg-line-chart';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import NumberFormat from 'react-number-format';
import 'fontsource-roboto';

const breakPoints = [
    { width: 1, itemsToShow: 1},
    { width: 550, itemsToShow: 2},
    { width: 768, itemsToShow: 4},
    { width: 1200, itemsToShow: 4}
];

class GlobalsCarousel extends Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        globalsData: [],
    }

    render() {
          
     return (
        <div>
            <CssBaseline />
            <Typography variant="h5" component="h5">
                <Box color="text.primary" mt={1} ml={1} mr={1}>24-Hour Market Activity</Box>
            </Typography>
            <Box component="div" mt={2.5} mb={2.5} ml={1} mr={1}>
                <Carousel breakPoints={breakPoints} itemsToScroll={4} itemsToShow={4}>
                    {this.state.globalsData.map(item => <div key={item.id}><div style={{textAlign: 'center', fontSize: 15}}>{item.title}</div><div style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{item.value}</div><br/><div>
                    <LineChart
                    pointsVisible={false}
                    labelsVisible={false}
                    gridVisible={false}
                    axisVisible={false}
                    pathColor="rgb(0, 199, 252)" 
                    viewBoxHeight={50}
                    viewBoxWidth={150}
                    data={item.points.map((point, i) => ({...point}))}
                    />
                    </div></div>)}
                </Carousel>
            </Box>
        </div>
      );
    }
    componentDidMount(){
      fetch('https://api.lunarcrush.com/v2?data=global&key=12jj7svid98m4xyvzmaalk4&data_points=24')
          .then(function(response) {
              return response.json();
          })
          .then(res => {
            var items = [];
            var timeSeries = res.data.timeSeries;

            title = 'Total Market Cap';
            value = <NumberFormat value={res.data.market_cap_24h} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'}/>;
            points = [];
            for(var i = 0; i < timeSeries.length; i++) {
                points.push({
                    x: timeSeries[i].time,
                    y: timeSeries[i].market_cap
                });
            }
            items.push({title: title, value: value, points: points});

            title = 'Total Social Engagement';
            value = <NumberFormat value={res.data.social_score_24h} decimalScale={2} displayType={'text'} thousandSeparator={true} />;
            points = [];
            for(var i = 0; i < timeSeries.length; i++) {
                points.push({
                    x: timeSeries[i].time,
                    y: timeSeries[i].social_score
                });
            }
            items.push({title: title, value: value, points: points});

            var title = 'Total Social Volume';
            var value = <NumberFormat value={res.data.social_volume_24h} decimalScale={2} displayType={'text'} thousandSeparator={true} />;
            var points = [];
            for(var i = 0; i < timeSeries.length; i++) {
                points.push({
                    x: timeSeries[i].time,
                    y: timeSeries[i].social_volume
                });
            }
            items.push({title: title, value: value, points: points});

            title = 'Total Shared Links';
            value = <NumberFormat value={res.data.unique_url_shares_24h} decimalScale={2} displayType={'text'} thousandSeparator={true} />;
            points = [];
            for(var i = 0; i < timeSeries.length; i++) {
                points.push({
                    x: timeSeries[i].time,
                    y: timeSeries[i].unique_url_shares
                });
            }
            items.push({title: title, value: value, points: points});

            title = 'Active Contributors';
            value = <NumberFormat value={res.data.social_contributors_24h} decimalScale={2} displayType={'text'} thousandSeparator={true} />;
            points = [];
            for(var i = 0; i < timeSeries.length; i++) {
                points.push({
                    x: timeSeries[i].time,
                    y: timeSeries[i].social_contributors
                });
            }
            items.push({title: title, value: value, points: points});

            title = 'Social Sentiment';
            value = <NumberFormat value={res.data.average_sentiment_24h} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={((res.data.average_sentiment_24h / 25) + 1) > 3 ? '% Bullish' : '% Bearish'}/>;
            points = [];
            for(var i = 0; i < timeSeries.length; i++) {
                points.push({
                    x: timeSeries[i].time,
                    y: timeSeries[i].average_sentiment
                });
            }
            items.push({title: title, value: value, points: points});

            title = 'Total Spam Volume';
            value = <NumberFormat value={res.data.tweet_spam_24h} decimalScale={2} displayType={'text'} thousandSeparator={true} />;
            points = [];
            for(var i = 0; i < timeSeries.length; i++) {
                points.push({
                    x: timeSeries[i].time,
                    y: timeSeries[i].tweet_spam
                });
            }
            items.push({title: title, value: value, points: points});

            title = 'Total Trading Volume';
            value = <NumberFormat value={res.data.volume_24h} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'$'}/>;
            points = [];
            for(var i = 0; i < timeSeries.length; i++) {
                points.push({
                    x: timeSeries[i].time,
                    y: timeSeries[i].volume
                });
            }
            items.push({title: title, value: value, points: points});

            title = 'BTC Dominance';
            value = <NumberFormat value={res.data.btc_dominance_1h} decimalScale={2} displayType={'text'} thousandSeparator={true} suffix={'%'} />;
            points = [];
            for(var i = 0; i < timeSeries.length; i++) {
                points.push({
                    x: timeSeries[i].time,
                    y: timeSeries[i].btc_dominance
                });
            }
            items.push({title: title, value: value, points: points});

            this.setState({ globalsData: items})
          })
      }
  }
  export default GlobalsCarousel;