import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {
    Redirect,
} from "react-router-dom";

function HomeButton() {
    let history = useHistory();
  
    function handleClick() {
      history.push("/");
    }

    return (
        <div>
            <button className='backButton' type="button" onClick={handleClick}>
                <ArrowBackIcon/> Back to Markets
            </button>
        </div>
      );
}

class CoinHeader extends Component {
    constructor(props) {
        super(props);
        this.coinName = props.coinName;
        this.coinSymbol = props.coinSymbol;
        this.coinImage = props.coinImage;
        this.state = {
            redirect: false,
            toggleValue: props.range
        }
    }


    render() {
        return (
            <div>
                <CssBaseline />
                <HomeButton/>
                <Box component="div" mt={1} mb={2}>
                    <Grid container>
                        <Grid item xs={12} md={8}>          
                            <Grid container>
                                <Grid item xs={2} md={1}>
                                    <div>
                                        <img style={{ width: 50, height: 50, borderRadius: '50%' }} src={this.coinImage}/>
                                    </div>
                                </Grid>
                                <Grid item xs={10} md={11}>
                                    <div style={{fontWeight: 'bold', fontSize: '2em', verticalAlign: 'middle'}}>{this.coinName} ({this.coinSymbol})</div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box component="div" mt={1} mb={1} mr={1} style={{textAlign: 'center'}}>
                                <ToggleButtonGroup value={this.state.toggleValue} aria-label="outlined button group">
                                    <ToggleButton onClick={() => { this.setState({redirect: true, toggleValue: '1D'}) }} value="1D">1D</ToggleButton>
                                    <ToggleButton onClick={() => { this.setState({redirect: true, toggleValue: '1W'}) }} value="1W">1W</ToggleButton>
                                    <ToggleButton onClick={() => { this.setState({redirect: true, toggleValue: '1M'}) }} value="1M">1M</ToggleButton>
                                    <ToggleButton onClick={() => { this.setState({redirect: true, toggleValue: '3M'}) }} value="3M">3M</ToggleButton>
                                    <ToggleButton onClick={() => { this.setState({redirect: true, toggleValue: '6M'}) }} value="6M">6M</ToggleButton>
                                    <ToggleButton onClick={() => { this.setState({redirect: true, toggleValue: '1Y'}) }} value="1Y">1Y</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                {this.state.redirect ? <Redirect push to={'/coins/' + this.coinSymbol + '?range=' + this.state.toggleValue} /> : '' }
            </div>
        );
    }
  
    componentDidMount(){
        
    }
}
export default CoinHeader;