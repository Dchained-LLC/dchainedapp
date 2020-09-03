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
        this.updatePage = props.updatePage;
        this.coinMeta = props.value;
        this.totalCoins = props.totalCoins;
        this.state= {
            value: 0,
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
        return (
            <div>
                <CoinHeader coinName = {this.coinMeta.name} coinSymbol = {this.coinMeta.symbol} coinImage= {this.coinMeta.image}></CoinHeader>
                <CoinFinancialInfo value = {this.coinMeta.symbol} totalCoins = {this.totalCoins}></CoinFinancialInfo>
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
                        <Tab label={"About " + this.coinMeta.name} {...this.a11yProps(5)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    <CoinChartWithVolume value = {this.coinMeta.symbol} updatePage = {this.updatePage}></CoinChartWithVolume>
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
                            <Feeds value={this.coinMeta.symbol}></Feeds>
                        </Col>
                        <Col xs={{span: 12, order: 1 }} md={{span: 4, order: 12 }}>
                            <CoinFinancialInfoBottom value={this.coinMeta.symbol} totalCoins = {this.totalCoins} coinMeta = {this.coinMeta}></CoinFinancialInfoBottom>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    componentDidMount(){
        
    }
}
export default CoinPage;