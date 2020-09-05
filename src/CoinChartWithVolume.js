import React, { Component } from 'react';

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
  CandlestickSeries,
  LineSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { CrossHairCursor } from "react-stockcharts/lib/coordinates";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";

import Navbar from 'react-bootstrap//Navbar';
import Nav from 'react-bootstrap//Nav';
import Grid from '@material-ui/core/Grid';
import Dropdown from 'react-bootstrap/Dropdown';
import Divider from '@material-ui/core/Divider';

const dateFormat = timeFormat("%Y-%m-%d");
const currencyFormat = format(",.2f");

function tooltipContent() {
	return ({ currentItem, xAccessor }) => {
		return {
			x: dateFormat(xAccessor(currentItem)),
			y: [
				{
					label: "Open",
					value: '$' + currencyFormat(currentItem.open)
				},
				{
					label: "High",
					value: '$' + currencyFormat(currentItem.high)
				},
				{
					label: "Low",
					value: '$' + currencyFormat(currentItem.low)
				},
				{
					label: "Close",
					value: '$' + currencyFormat(currentItem.close)
				},
				{
					label: "Volume",
					value: '$' + currencyFormat(currentItem.volume)
				},
				{
					label: currentItem.metric_label,
					value: currentItem.metric_value
				}
      ]
		};
	};
};


class CoinChartWithVolume extends Component {
    constructor(props) {
        super(props);
        this.value = props.value;
        this.updatePage = props.updatePage;
        this.state = {
          dataPoints: [],
          isDesktop: false,
          selectedMetric: 'Galaxy Score™'
        };
        this.updatePredicate = this.updatePredicate.bind(this);
    }

    updatePredicate() {
      this.setState({ isDesktop: window.innerWidth > 999 });
    }

    handleChartDataChange = (selected) => {
      this.setState({selectedMetric: selected});
    }

    render() {    
      if (this.state.dataPoints.length == 0) {
        return <div>Loading...</div>
      }
  
      const xScaleProvider = discontinuousTimeScaleProvider
        .inputDateAccessor(d => d.date);
      const {
        data,
        xScale,
        xAccessor,
        displayXAccessor,
      } = xScaleProvider(this.state.dataPoints);
  
      const start = xAccessor(last(data));
      const end = xAccessor(data[Math.max(0, data.length - 100)]);
      const xExtents = [start, end];

      const isDesktop = this.state.isDesktop;
      
      return (
        <Grid container spacing={3}>
          <Grid item sm={12} md={2}>
              { isDesktop ? (
              <Navbar collapseOnSelect bg="light" expand="lg">
                  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="flex-column" style={{maxHeight: 500, overflow: 'scroll'}}>
                          <Navbar.Text>Key Metrics</Navbar.Text>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Galaxy Score™')}} style={{color: "black"}} href="">Galaxy Score™</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('AltRank™')}} style={{color: "black"}} href="">AltRank™</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Correlation Rank')}} style={{color: "black"}} href="">Correlation Rank</Nav.Link>
                          <Divider />
                          <Navbar.Text>Social Metrics</Navbar.Text>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Social Volume')}} style={{color: "black"}} href="">Social Volume</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Social Engagement')}} style={{color: "black"}} href="">Social Engagement</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Social Contributors')}} style={{color: "black"}} href="">Social Contributors</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Social Dominance')}} style={{color: "black"}} href="">Social Dominance</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Average Sentiment')}} style={{color: "black"}} href="">Average Sentiment</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Bullish Sentiment')}} style={{color: "black"}} href="">Bullish Sentiment</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('earish Sentiment')}} style={{color: "black"}} href="">Bearish Sentiment</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Shared Links')}} style={{color: "black"}} href="">Shared Links</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Twitter Volume')}} style={{color: "black"}} href="">Twitter Volume</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Reddit Volume')}} style={{color: "black"}} href="">Reddit Volume</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Medium Volume')}} style={{color: "black"}} href="">Medium Volume</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Youtube Volume')}} style={{color: "black"}} href="">Youtube Volume</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('News Volume')}} style={{color: "black"}} href="">News Volume</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Spam Volume')}} style={{color: "black"}} href="">Spam Volume</Nav.Link>
                          <Divider />
                          <Navbar.Text>Trading Metrics</Navbar.Text>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Market Cap')}} style={{color: "black"}} href="">Market Cap</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Market Dominance')}} style={{color: "black"}} href="">Market Dominance</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Volatility')}} style={{color: "black"}} href="">Volatility</Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
              </Navbar> ) : (
                  <Dropdown id="dropdown-basic-button" title="Choose Metric">
                      <Dropdown.Toggle id="dropdown-basic">
                          {this.state.selectedMetric}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                          <Dropdown.Header>Key Metrics</Dropdown.Header>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Galaxy Score™')}}  href="">Galaxy Score™</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('AltRank™')}} href="">AltRank™</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Correlation Rank')}} href="">Correlation Rank</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Header>Social Metrics</Dropdown.Header>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Social Volume')}} href="">Social Volume</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Social Engagement')}} href="">Social Engagement</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Social Contributors')}} href="">Social Contributors</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Social Dominance')}} href="">Social Dominance</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Average Sentiment')}} href="">Average Sentiment</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Bullish Sentiment')}} href="">Bullish Sentiment</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Bearish Sentiment')}} href="">Bearish Sentiment</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Shared Links')}} href="">Shared Links</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Twitter Volume')}} href="">Twitter Volume</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Reddit Volume')}} href="">Reddit Volume</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Medium Volume')}} href="">Medium Volume</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Youtube Volume')}} href="">Youtube Volume</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('News Volume')}} href="">News Volume</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Spam Volume')}} href="">Spam Volume</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Header>Trading Metrics</Dropdown.Header>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Market Cap')}} href="">Market Cap</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Market Dominance')}} href="">Market Dominance</Dropdown.Item>
                          <Dropdown.Item onClick={e => {this.handleChartDataChange('Volatility')}} href="">Volatility</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
              )}
          </Grid>
          <Grid item sm={12} md={10}>
            <ChartCanvas 
              height={500}
              ratio={5}
              width={window.innerWidth * .8}
              zoomEvent={false}
              panEvent={false}
              margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
              type={'svg'}
              seriesName="MSFT"
              data={data}
              xScale={xScale}
              xAccessor={xAccessor}
              displayXAccessor={displayXAccessor}
              xExtents={xExtents}
            >
      
              <Chart id={1} height={290} yExtents={d => [d.high, d.low]} >
                <YAxis axisAt="left" orient="left" ticks={5}/>
                <XAxis axisAt="bottom" orient="bottom" showTicks={false}/>
                <CandlestickSeries />
                <HoverTooltip 
                  yAccessor={d => d.volume}
                  tooltipContent={ tooltipContent() }
                  fontSize={15}
                />
              </Chart>
              <Chart id={2} height={290} yExtents={d => d.metric_value}>
                  <YAxis axisAt="right" orient="right" ticks={5}/>
                  <LineSeries yAccessor={d => d.metric_value} />
              </Chart>
              <Chart id={3} origin={(w, h) => [0, h - 150]} height={150} yExtents={d => d.volume}>
                <XAxis axisAt="bottom" orient="bottom"/>
                <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>
                <BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "red"} />
              </Chart>
              <CrossHairCursor/>
            </ChartCanvas>
          </Grid>
      </Grid>
      );
    }

  componentDidMount(){
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUpdate () {
    fetch('https://api.lunarcrush.com/v2?data=assets&key=12jj7svid98m4xyvzmaalk4&data_points=168&symbol=' + this.value)
		.then(function(response) {
			return response.json();
		})
		.then(res => {
      var timeSeries = res.data[0].timeSeries;
      var myDataPoints = [];
      for (var i = 0; i < timeSeries.length; i++) {
        var metricValue = timeSeries[i].galaxy_score;
        var metricLabel = 'Galaxy Score™';
        if(this.state.selectedMetric == 'Galaxy Score™') {
          metricValue = timeSeries[i].galaxy_score;
          metricLabel = 'Galaxy Score™';
        }
        else if(this.state.selectedMetric == 'AltRank™') {
          metricValue = timeSeries[i].alt_rank;
          metricLabel = 'AltRank™';
        }
        else if(this.state.selectedMetric == 'Correlation Rank') {
          metricValue = timeSeries[i].correlation_rank;
          metricLabel = 'Correlation Rank';
        }
        else if(this.state.selectedMetric == 'Social Volume') {
          metricValue = timeSeries[i].social_volume;
          metricLabel = 'Social Volume';
        }
        else if(this.state.selectedMetric == 'Social Engagement') {
          metricValue = timeSeries[i].social_score;
          metricLabel = 'Social Engagement';
        }
        else if(this.state.selectedMetric == 'Social Contributors') {
          metricValue = timeSeries[i].social_contributors;
          metricLabel = 'Social Contributors';
        }
        else if(this.state.selectedMetric == 'Social Dominance') {
          metricValue = timeSeries[i].social_dominance;
          metricLabel = 'Social Dominance';
        }
        else if(this.state.selectedMetric == 'Average Sentiment') {
          metricValue = timeSeries[i].average_sentiment;
          metricLabel = 'Average Sentiment';
        }
        else if(this.state.selectedMetric == 'Bullish Sentiment') {
          metricValue = timeSeries[i].galaxy_score;
          metricLabel = 'Bullish Sentiment';
        }
        else if(this.state.selectedMetric == 'Bearish Sentiment') {
          metricValue = timeSeries[i].galaxy_score;
          metricLabel = 'Bearish Sentiment';
        }
        else if(this.state.selectedMetric == 'Shared Links') {
          metricValue = timeSeries[i].unique_url_shares;
          metricLabel = 'Shared Links';
        }
        else if(this.state.selectedMetric == 'Twitter Volume') {
          metricValue = timeSeries[i].tweets;
          metricLabel = 'Twitter Volume';
        }
        else if(this.state.selectedMetric == 'Reddit Volume') {
          metricValue = timeSeries[i].reddit_posts;
          metricLabel = 'Reddit Volume';
        }
        else if(this.state.selectedMetric == 'Medium Volume') {
          metricValue = timeSeries[i].galaxy_score;
          metricLabel = 'Medium Volume';
        }
        else if(this.state.selectedMetric == 'Youtube Volume') {
          metricValue = timeSeries[i].galaxy_score;
          metricLabel = 'Youtube Volume';
        }
        else if(this.state.selectedMetric == 'News Volume') {
          metricValue = timeSeries[i].news;
          metricLabel = 'News Volume';
        }
        else if(this.state.selectedMetric == 'Spam Volume') {
          metricValue = timeSeries[i].tweet_spam;
          metricLabel = 'pam Volume';
        }
        else if(this.state.selectedMetric == 'Market Cap') {
          metricValue = timeSeries[i].market_cap;
          metricLabel = 'Market Cap';
        }
        else if(this.state.selectedMetric == 'Market Dominance') {
          metricValue = timeSeries[i].market_dominance;
          metricLabel = 'Market Dominance';
        }
        else if(this.state.selectedMetric == 'Volatility') {
          metricValue = timeSeries[i].volatility;
          metricLabel = 'Volatility';
        }
        myDataPoints.push({
          date: new Date(timeSeries[i].time * 1000),
          open: timeSeries[i].open, 
          high: timeSeries[i].high,
          low: timeSeries[i].low,
          close: timeSeries[i].close,
          volume: timeSeries[i].volume,
          metric_label: metricLabel,
          metric_value: metricValue
        });
      }
      this.setState({dataPoints: myDataPoints});
		});
  }

}

CoinChartWithVolume = fitWidth(CoinChartWithVolume);

export default CoinChartWithVolume;