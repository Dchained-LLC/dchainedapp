import React, { Component } from 'react';
import CoinHeader from './CoinHeader';
import CoinFinancialInfo from './CoinFinancialInfo';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Feeds from './Feeds';
import CoinFinancialInfoBottom from './CoinFinancialInfoBottom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoinChartWithVolume from './CoinChartWithVolume';

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

class CoinPage extends Component {
    constructor(props) {
        super(props);
        this.coin = props.coin;
        this.state= {
            value: 0,
            coinMeta: [],
            totalCoins: 0
        };
    }

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

        return (
            <div>
                <CoinHeader coinName = {this.state.coinMeta.name} coinSymbol = {this.state.coinMeta.symbol} coinImage= {this.state.coinMeta.image}></CoinHeader>
                <CoinFinancialInfo value = {this.state.coinMeta.symbol} totalCoins = {this.state.totalCoins}></CoinFinancialInfo>
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
                        <Tab label="Galaxy Score" {...this.a11yProps(1)} />
                        <Tab label="ALTRank" {...this.a11yProps(2)} />
                        <Tab label="All Metrics" {...this.a11yProps(3)} />
                        <Tab label="Market Pairs" {...this.a11yProps(4)} />
                        <Tab label={"About " + this.state.coinMeta.name} {...this.a11yProps(5)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    <CoinChartWithVolume value = {this.state.coinMeta.symbol}></CoinChartWithVolume>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    
                </TabPanel>
                <TabPanel value={this.state.value} index={3}>
                    
                </TabPanel>
                <TabPanel value={this.state.value} index={4}>
                    
                </TabPanel>
                <TabPanel value={this.state.value} index={5}>
                    
                </TabPanel>
                <Divider />
                <br/>
                <Container>
                    <Row>
                        <Col xs={{span: 12, order: 12 }} md={{span: 8, order: 1 }}>
                            <Feeds value={this.state.coinMeta.symbol}></Feeds>
                        </Col>
                        <Col xs={{span: 12, order: 1 }} md={{span: 4, order: 12 }}>
                            <CoinFinancialInfoBottom totalCoins = {this.state.totalCoins} coinMeta = {this.state.coinMeta}></CoinFinancialInfoBottom>
                        </Col>
                    </Row>
                </Container>
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
                this.setState({coinMeta: myCoinMeta, totalCoins: totalNumberOfCoins});
            })
        })
    }
}
export default CoinPage;