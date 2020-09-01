import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

class CoinHeader extends Component {
    constructor(props) {
        super(props);
        this.coinName = props.coinName;
        this.coinSymbol = props.coinSymbol;
        this.coinImage = props.coinImage;
    }

    render() {
        
        return (
            <div>
                <CssBaseline />
                <Box component="div" mt={2.5} mb={2.5}>
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
                </Box>
                <Divider />
            </div>
        );
    }
  
    componentDidMount(){
    
	}
}
export default CoinHeader;