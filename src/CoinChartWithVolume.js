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
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { CrossHairCursor } from "react-stockcharts/lib/coordinates";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";
import { utcDay } from "d3-time";

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

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}


class CoinChartWithVolume extends Component {
    constructor(props) {
        super(props);
        this.value = props.value;
        this.updatePage = props.updatePage;
        this.state = {
          firstLoad: true,
          dataPoints: [],
          isDesktop: false,
          percentWidth: 0.8,
          selectedMetric: 'Galaxy Score™',
          range: props.range
        };
        this.updatePredicate = this.updatePredicate.bind(this);
    }

    updatePredicate() {
      var myPercentWidth = 0.8;
      var myIsDesktop = true;
      if(window.innerWidth < 999) {
        myPercentWidth = 0.95;
        myIsDesktop = false;
      }
      this.setState({ isDesktop: myIsDesktop, percentWidth: myPercentWidth });
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

      var width = window.innerWidth * this.state.percentWidth;
      var margin = {left: 50, right: 50, top: 10, bottom: 30};
      var gridWidth = width - margin.left - margin.right;

      var showGrid = true;
      var yGrid = showGrid ? { 
          innerTickSize: -1 * gridWidth,
          tickStrokeDasharray: 'Solid',
          tickStrokeOpacity: 0.2,
          tickStrokeWidth: 1
      } : {};
      
      return (
        <Grid container spacing={3}>
          <Grid item sm={12} md={2}>
              { isDesktop ? (
              <Navbar collapseOnSelect bg="light" expand="lg">
                  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="flex-column" style={{maxHeight: 500, overflow: 'scroll'}}>
                          <Navbar.Text>Key Metrics</Navbar.Text>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Galaxy Score™')}} className={this.state.selectedMetric == 'Galaxy Score™' ? 'selectedMetric' : null} style={{color: "black"}} href="">Galaxy Score™</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('AltRank™')}} className={this.state.selectedMetric == 'AltRank™' ? 'selectedMetric' : null} style={{color: "black"}} href="">AltRank™</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Correlation Rank')}} className={this.state.selectedMetric == 'Correlation Rank' ? 'selectedMetric' : null} style={{color: "black"}} href="">Correlation Rank</Nav.Link>
                          <Divider />
                          <Navbar.Text>Social Metrics</Navbar.Text>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Social Volume')}} className={this.state.selectedMetric == 'Social Volume' ? 'selectedMetric' : null} style={{color: "black"}} href="">Social Volume</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Social Engagement')}} className={this.state.selectedMetric == 'Social Engagement' ? 'selectedMetric' : null} style={{color: "black"}} href="">Social Engagement</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Social Contributors')}} className={this.state.selectedMetric == 'Social Contributors' ? 'selectedMetric' : null} style={{color: "black"}} href="">Social Contributors</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Social Dominance')}} className={this.state.selectedMetric == 'Social Dominance' ? 'selectedMetric' : null} style={{color: "black"}} href="">Social Dominance</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Average Sentiment')}} className={this.state.selectedMetric == 'Average Sentiment' ? 'selectedMetric' : null} style={{color: "black"}} href="">Average Sentiment</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Bullish Sentiment')}} className={this.state.selectedMetric == 'Bullish Sentiment' ? 'selectedMetric' : null} style={{color: "black"}} href="">Bullish Sentiment</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Bearish Sentiment')}} className={this.state.selectedMetric == 'Bearish Sentiment' ? 'selectedMetric' : null} style={{color: "black"}} href="">Bearish Sentiment</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Shared Links')}} className={this.state.selectedMetric == 'Shared Links' ? 'selectedMetric' : null} style={{color: "black"}} href="">Shared Links</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Twitter Volume')}} className={this.state.selectedMetric == 'Twitter Volume' ? 'selectedMetric' : null} style={{color: "black"}} href="">Twitter Volume</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Reddit Volume')}} className={this.state.selectedMetric == 'Reddit Volume' ? 'selectedMetric' : null} style={{color: "black"}} href="">Reddit Volume</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Medium Volume')}} className={this.state.selectedMetric == 'Medium Volume' ? 'selectedMetric' : null} style={{color: "black"}} href="">Medium Volume</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Youtube Volume')}} className={this.state.selectedMetric == 'Youtube Volume' ? 'selectedMetric' : null} style={{color: "black"}} href="">Youtube Volume</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('News Volume')}} className={this.state.selectedMetric == 'News Volume' ? 'selectedMetric' : null} style={{color: "black"}} href="">News Volume</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Spam Volume')}} className={this.state.selectedMetric == 'Spam Volume' ? 'selectedMetric' : null} style={{color: "black"}} href="">Spam Volume</Nav.Link>
                          <Divider />
                          <Navbar.Text>Trading Metrics</Navbar.Text>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Market Cap')}} className={this.state.selectedMetric == 'Market Cap' ? 'selectedMetric' : null} style={{color: "black"}} href="">Market Cap</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Market Dominance')}} className={this.state.selectedMetric == 'Market Dominance' ? 'selectedMetric' : null} style={{color: "black"}} href="">Market Dominance</Nav.Link>
                          <Nav.Link onClick={e => {this.handleChartDataChange('Volatility')}} className={this.state.selectedMetric == 'Volatility' ? 'selectedMetric' : null} style={{color: "black"}} href="">Volatility</Nav.Link>
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
            <div className='chartContainer'>
            
            <ChartCanvas 
              height={500}
              //ratio={0}
              width={window.innerWidth * this.state.percentWidth}
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
      
              <Chart id={1} height={290} yExtents={d => [d.high + (.05 * d.high), d.low - (.05 * d.low)]} >
                <YAxis axisAt="left" orient="left" {...yGrid}/>
                <XAxis axisAt="bottom" orient="bottom" showTicks={true} ticks={5}/>
                <CandlestickSeries />
                <HoverTooltip 
                  yAccessor={d => d.volume}
                  tooltipContent={ tooltipContent() }
                  fontSize={15}
                />
              </Chart>
              <Chart id={2} height={290} yExtents={d => [d.metric_value + (.1 * d.metric_value), d.metric_value - (.1 * d.metric_value)]}>
                  <YAxis axisAt="right" orient="right"/>
                  <LineSeries yAccessor={d => d.metric_value} />
              </Chart>
              <Chart id={3} origin={(w, h) => [0, h - 150]} height={150} yExtents={d => d.volume}>
                <XAxis axisAt="bottom" orient="bottom" ticks={5}/>
                <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} {...yGrid}/>
                <BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "red"} />
              </Chart>
              <CrossHairCursor/>
            </ChartCanvas>
            
            </div>
          </Grid>
      </Grid>
      );
    }

  componentDidMount(){
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
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

  componentDidUpdate (prevProps, prevState) {
    if(this.state.firstLoad || (prevState.selectedMetric != this.state.selectedMetric) || (prevState.range != this.props.range)) {
      var {interval, numOfPoints } = this.getCriteria(this.props.range);

      fetch('https://api.lunarcrush.com/v2?data=assets&key=12jj7svid98m4xyvzmaalk4&data_points=' + numOfPoints + '&interval=' + interval + '&symbol=' + this.value)
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
            metricValue = timeSeries[i].tweet_sentiment4 + timeSeries[i].tweet_sentiment5;
            metricLabel = 'Bullish Sentiment';
          }
          else if(this.state.selectedMetric == 'Bearish Sentiment') {
            metricValue = timeSeries[i].tweet_sentiment1 + timeSeries[i].tweet_sentiment2;
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
            metricValue = timeSeries[i].medium;
            metricLabel = 'Medium Volume';
          }
          else if(this.state.selectedMetric == 'Youtube Volume') {
            metricValue = timeSeries[i].youtube;
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
        this.setState({dataPoints: myDataPoints, range: this.props.range, firstLoad: false});
      });
    }
  }

}

CoinChartWithVolume = fitWidth(CoinChartWithVolume);

export default CoinChartWithVolume;