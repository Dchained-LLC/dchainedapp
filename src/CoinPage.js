import React, { Component } from 'react';
import CoinHeader from './CoinHeader';
import CoinFinancialInfo from './CoinFinancialInfo';
import CoinChart from './CoinChart';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Navbar from 'react-bootstrap//Navbar';
import Nav from 'react-bootstrap//Nav';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Feeds from './Feeds';
import CoinFinancialInfoBottom from './CoinFinancialInfoBottom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            isDesktop: false,
            selectedMetric: 'Galaxy Score™'
        };
        this.updatePredicate = this.updatePredicate.bind(this);
    }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 999 });
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
        const isDesktop = this.state.isDesktop;
        
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
                    <Grid container spacing={3}>
                        <Grid item sm={12} md={2}>
                            { isDesktop ? (
                            <Navbar collapseOnSelect bg="light" expand="lg">
                                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="flex-column" style={{maxHeight: 400, overflow: 'scroll'}}>
                                        <Navbar.Text>Key Metrics</Navbar.Text>
                                        <Nav.Link style={{color: "black"}} href="">Galaxy Score™</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">AltRank™</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Correlation Rank</Nav.Link>
                                        <Divider />
                                        <Navbar.Text>Social Metrics</Navbar.Text>
                                        <Nav.Link style={{color: "black"}} href="">Social Volume</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Social Engagement</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Social Contributors</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Social Dominance</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Average Sentiment</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Bullish Sentiment</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Bearish Sentiment</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Shared Links</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Twitter Volume</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Reddit Volume</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Medium Volume</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Youtube Volume</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">News Volume</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Spam Volume</Nav.Link>
                                        <Divider />
                                        <Navbar.Text>Trading Metrics</Navbar.Text>
                                        <Nav.Link style={{color: "black"}} href="">Market Cap</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Market Dominance</Nav.Link>
                                        <Nav.Link style={{color: "black"}} href="">Volatility</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar> ) : (
                                <Dropdown id="dropdown-basic-button" title="Choose Metric">
                                    <Dropdown.Toggle id="dropdown-basic">
                                        {this.state.selectedMetric}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Header>Key Metrics</Dropdown.Header>
                                        <Dropdown.Item href="">Galaxy Score™</Dropdown.Item>
                                        <Dropdown.Item href="">AltRank™</Dropdown.Item>
                                        <Dropdown.Item href="">Correlation Rank</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Header>Social Metrics</Dropdown.Header>
                                        <Dropdown.Item href="">Social Volume</Dropdown.Item>
                                        <Dropdown.Item href="">Social Engagement</Dropdown.Item>
                                        <Dropdown.Item href="">Social Contributors</Dropdown.Item>
                                        <Dropdown.Item href="">Social Dominance</Dropdown.Item>
                                        <Dropdown.Item href="">Average Sentiment</Dropdown.Item>
                                        <Dropdown.Item href="">Bullish Sentiment</Dropdown.Item>
                                        <Dropdown.Item href="">Bearish Sentiment</Dropdown.Item>
                                        <Dropdown.Item href="">Shared Links</Dropdown.Item>
                                        <Dropdown.Item href="">Twitter Volume</Dropdown.Item>
                                        <Dropdown.Item href="">Reddit Volume</Dropdown.Item>
                                        <Dropdown.Item href="">Medium Volume</Dropdown.Item>
                                        <Dropdown.Item href="">Youtube Volume</Dropdown.Item>
                                        <Dropdown.Item href="">News Volume</Dropdown.Item>
                                        <Dropdown.Item href="">Spam Volume</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Header>Trading Metrics</Dropdown.Header>
                                        <Dropdown.Item href="">Market Cap</Dropdown.Item>
                                        <Dropdown.Item href="">Market Dominance</Dropdown.Item>
                                        <Dropdown.Item href="">Volatility</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </Grid>
                        <Grid item sm={12} md={10}>
                            <CoinChart value = {this.coinMeta.symbol} updatePage = {this.updatePage}></CoinChart>
                        </Grid>
                    </Grid>
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
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }
}
export default CoinPage;