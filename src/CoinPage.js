import React, { Component } from 'react';
import CoinHeader from './CoinHeader';
import CoinFinancialInfo from './CoinFinancialInfo';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Feeds from './Feeds';
import CoinFinancialInfoBottom from './CoinFinancialInfoBottom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoinChartWithVolume from './CoinChartWithVolume';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import MarketPairsTable from './MarketsPairsTable';
import { withStyles } from "@material-ui/core/styles";
import AllMetrics from './AllMetrics';
import GalaxyScore from './GalaxyScore';
import AltRank from './AltRank';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const styles = {
    iconLabelWrapper: {
      flexDirection: "row",
      marginTop: -3
    }
};

class CoinPage extends Component {
    constructor(props) {
        super(props);
        this.coin = props.coin;
        this.state= {
            value: new URLSearchParams(props.search).get('section') ? parseInt(new URLSearchParams(props.search).get('section')) : 0,
            coinMeta: [],
            assetsData: [],
            totalCoins: 0,
            range: new URLSearchParams(props.search).get('range') ? new URLSearchParams(props.search).get('range') : '1W'
        };
    }

    setRange = (newRange) => {
        this.setState({range: newRange});
    };

    setValue = (newValue) => {
        this.setState({value: newValue});
    };

    handleChange = (event, newValue) => {
       this.setValue(newValue);
    };

    a11yProps = (index) => {
        return {
          id: `scrollable-auto-tab-${index}`,
          'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    render() {
        if(this.state.coinMeta.length == 0) {
            return <div>Loading...</div>;
        }

        const { classes } = this.props;

        return (
            <div>
                <CoinHeader range = {this.state.range} coinName = {this.state.coinMeta.name} coinSymbol = {this.state.coinMeta.symbol} coinImage= {this.state.coinMeta.image}></CoinHeader>
                <CoinFinancialInfo value = {this.state.coinMeta.symbol} totalCoins = {this.state.totalCoins} range = {this.state.range}></CoinFinancialInfo>
                <AppBar position="static" color="default">
                    <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Summary" {...this.a11yProps(0)} />
                        <Tab label={"Galaxy Score (" + this.state.assetsData.galaxy_score + "/100)"} icon={<span className='galaxyScoreSmall'><img style={{ width: 15, height: 15, position: "relative", top: '2px' }} src={require('./assets/galaxy-icon.svg')}/></span>} classes={{ wrapper: classes.iconLabelWrapper }} {...this.a11yProps(1)} />
                        <Tab label={"ALTRank (" + this.state.assetsData.alt_rank + "/" + this.state.totalCoins + ")"} icon={<span className='altRankSmall'><img style={{ width: 15, height: 15, position: "relative", top: '2px' }} src={require('./assets/trophy-icon.svg')}/></span>} classes={{ wrapper: classes.iconLabelWrapper}} {...this.a11yProps(2)} />
                        <Tab label="All Metrics" {...this.a11yProps(3)} />
                        <Tab label="Market Pairs" {...this.a11yProps(4)} />
                        <Tab label={"About " + this.state.coinMeta.name} {...this.a11yProps(5)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    <CoinChartWithVolume value = {this.state.coinMeta.symbol} range={this.state.range}></CoinChartWithVolume>
                    <Divider />
                    <br/>
                    <Row>
                        <Col xs={{span: 12, order: 12 }} md={{span: 7, order: 1 }}>
                            <Feeds value={this.state.coinMeta.symbol}></Feeds>
                        </Col>
                        <Col xs={{span: 12, order: 1 }} md={{span: 5, order: 12 }}>
                            <CoinFinancialInfoBottom totalCoins = {this.state.totalCoins} coinMeta = {this.state.coinMeta} range = {this.state.range} tabSelector={this.setValue}></CoinFinancialInfoBottom>
                        </Col>
                    </Row>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <GalaxyScore coin = {this.state.coinMeta.symbol} range = {this.state.range}></GalaxyScore>
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    <AltRank coin = {this.state.coinMeta.symbol} range = {this.state.range} totalCoins = {this.state.totalCoins}></AltRank>
                </TabPanel>
                <TabPanel value={this.state.value} index={3}>
                    <AllMetrics coin = {this.state.coinMeta.symbol} range = {this.state.range}></AllMetrics>
                </TabPanel>
                <TabPanel value={this.state.value} index={4}>
                    <MarketPairsTable coin={this.state.coinMeta.symbol}></MarketPairsTable>
                </TabPanel>
                <TabPanel value={this.state.value} index={5}>
                    <CssBaseline />
                    <Box component="div">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <Paper className='myPaperNoHover' elevation={3}>
                                    <div className='infoTitle'>Description</div>
                                    <div className='infoText' dangerouslySetInnerHTML={{__html: this.state.coinMeta.description}}></div>
                                    <div className='infoTitle'>Technology</div>
                                    <div className='infoText' dangerouslySetInnerHTML={{__html: this.state.coinMeta.technology}}></div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper className='myPaperNoHover' elevation={3}>
                                    {this.state.coinMeta.github_link ? <div className='linkContainer'><div className='linkTitle'>Github:</div><div><a className='linkItem' href={this.state.coinMeta.github_link}>{this.state.coinMeta.github_link}</a></div></div> : '' }
                                    {this.state.coinMeta.whitepaper_link ? <div className='linkContainer'><div className='linkTitle'>Whitepaper:</div><div><a className='linkItem' href={this.state.coinMeta.whitepaper_link}>{this.state.coinMeta.whitepaper_link}</a></div></div> : '' }
                                    {this.state.coinMeta.twitter_link ? <div className='linkContainer'><div className='linkTitle'>Twitter:</div><div><a className='linkItem' href={this.state.coinMeta.twitter_link}>{this.state.coinMeta.twitter_link}</a></div></div> : '' }
                                    {this.state.coinMeta.reddit_link ? <div className='linkContainer'><div className='linkTitle'>Reddit:</div><div><a className='linkItem' href={this.state.coinMeta.reddit_link}>{this.state.coinMeta.reddit_link}</a></div></div> : '' }
                                    {this.state.coinMeta.telegram_link ? <div className='linkContainer'><div className='linkTitle'>Telegram:</div><div><a className='linkItem' href={this.state.coinMeta.telegram_link}>{this.state.coinMeta.telegram_link}</a></div></div> : '' }
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
            </div>
        );
    }

    componentDidMount(){
        fetch('https://api.lunarcrush.com/v2?data=meta&key=12jj7svid98m4xyvzmaalk4&type=full&symbol=' + this.coin)
        .then(function(response) {
            return response.json();
        })
        .then(res => {
            var myCoinMeta = res.data[0];
            fetch('https://api.lunarcrush.com/v2?data=meta&key=12jj7svid98m4xyvzmaalk4&type=counts')
            .then(function(response) {
                return response.json();
            })
            .then(res => {
                var totalNumberOfCoins = res.data.num_active_coins;
                fetch('https://api.lunarcrush.com/v2?data=assets&key=12jj7svid98m4xyvzmaalk4&data_points=168&symbol=' + this.coin)
                .then(function(response) {
                    return response.json();
                })
                .then(res => {
                    var myData = res.data[0];
                    this.setState({coinMeta: myCoinMeta, totalCoins: totalNumberOfCoins, assetsData: myData});
                })
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        var newRange = new URLSearchParams(this.props.search).get('range') ? new URLSearchParams(this.props.search).get('range') : '1W'
        if(prevState.range != newRange) {
            this.setRange(newRange);
        }
    }
}
export default withStyles(styles)(CoinPage);