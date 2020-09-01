import React, { Component } from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import NumberFormat from 'react-number-format';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

class MarketsTable extends Component {
    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
        this.updatePage = props.updatePage;
    }
    
    state = {
        loading: false,
        marketsData: [],
        metaData: {},
    }

    handleRowClick = (event, rowData) => {
        this.updatePage(2, this.state.metaData[rowData.s], Object.keys(this.state.metaData).length);
    };

    abbreviateNumber = (number) => {

        var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

        // what tier? (determines SI symbol)
        var tier = Math.log10(number) / 3 | 0;

        // if zero, we don't need a suffix
        if(tier == 0) return number;

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);

        // scale the number
        var scaled = number / scale;

        // format number and add suffix
        return scaled.toFixed(1) + suffix;
    }

    scientificToDecimal = (num) => {
        var nsign = Math.sign(num);
        //remove the sign
        num = Math.abs(num);
        //if the number is in scientific notation remove it
        if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
            var zero = '0',
                    parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
                    e = parts.pop(), //store the exponential part
                    l = Math.abs(e), //get the number of zeros
                    sign = e / l,
                    coeff_array = parts[0].split('.');
            if (sign === -1) {
                l = l - coeff_array[0].length;
                if (l < 0) {
                  num = coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
                } 
                else {
                  num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
                }
            } 
            else {
                var dec = coeff_array[1];
                if (dec)
                    l = l - dec.length;
                if (l < 0) {
                  num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
                } else {
                  num = coeff_array.join('') + new Array(l + 1).join(zero);
                }
            }
        }
    
        return nsign < 0 ? '-'+num : num;
    }

    suggestColor = (value) => {
     if(value < 0) {
         return 'red';
     }
     return 'green';
    }

    render() {
        const tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
          };

        const options = {
            pageSize: 50,
            pageSizeOptions: [25,50,75,100,300],
            isLoading: true,
            search: true,
            searchFieldAlignment: 'left',
            sorting: true,
            loadingType: 'linear',
            headerStyle: {
                fontWeight: 'bold'
            },
            fixedColumns: {
                left: 2
            },
            searchFieldStyle: {
                
            }
         }

        return (
            <div>
            <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <MaterialTable
                tableRef={ this.state.tableRef }
                icons={tableIcons}
                title=""
                showTitle={false}
                options={options}
                onRowClick={this.handleRowClick}
                columns={[
                    { title: <div className="hasTooltip">#<span className="tooltip">Sort by Index</span></div>, field: 'tableData.id' , width: 10 , align: 'center' , render: rowData => rowData.tableData.id + 1  },
                    { title: <div className="hasTooltip">Coin<span className="tooltip">Sort by Coin</span></div>, field: 'n' , width: 200 , align: 'center' , render: rowData => <div style={{display: 'flex', alignItems: 'left'}}><div style={{margin: 5, textAlign: 'center'}}> <img style={{ width: 28, height: 28, borderRadius: '50%' }} src={this.state.metaData[rowData.s].image}/></div><div style={{margin: 5, textAlign: 'left'}}>{rowData.n}<br/><span style={{fontWeight: 'bold'}}>{rowData.s}</span></div></div>},
                    { title: <div className="hasTooltip">Price<span className="tooltip">Sort by Price</span></div>, field: 'p' , width: 150 , align: 'center' , type: 'currency' , render: rowData => <div><NumberFormat value={rowData.p} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /><br/><NumberFormat value={this.scientificToDecimal(rowData.p_btc)} displayType={'text'} thousandSeparator={true} suffix={' BTC'} decimalScale={8} fixedDecimalScale={true} /></div>},
                    { title: <div className="hasTooltip">1H % Change (USD)<span className="tooltip">Sort by 1H % Change (USD)</span></div>, field: 'pch' , align: 'center' , width: 150 , render: rowData => <div style={{color: this.suggestColor(rowData.pch)}}><NumberFormat value={rowData.pch} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />%</div>  },
                    { title: <div className="hasTooltip">24H % Change (USD)<span className="tooltip">Sort by 24H % Change (USD</span></div>, field: 'pc' , align: 'center' , width: 150 , render: rowData => <div style={{color: this.suggestColor(rowData.pc)}}><NumberFormat value={rowData.pc} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />%</div>  },
                    { title: <div className="hasTooltip">24H % Change (BTC)<span className="tooltip">Sort by 24H % Change (BTC)</span></div>, field: 'pc' , align: 'center' , width: 150 , render: rowData => <div style={{color: this.suggestColor(rowData.pc)}}><NumberFormat value={rowData.pc} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />%</div>  },
                    { title: <div className="hasTooltip">Galaxy Score™<span className="tooltip">Sort by Galaxy Score™<br/><br/>Galaxy Score™ indicates how healthy a coin is by looking at combined performance indicators accross markets and deep social engagement.</span></div>, field: 'gs' , width: 150 , align: 'center' , type: 'numeric' },
                    { title: <div className="hasTooltip">ALTRank™<span className="tooltip">Sort by ALTRank™<br/><br/>ALTRank™ is a unique measurement that combines altcoin price performance relative to Bitcoin and social activity indicators.</span></div>, field: 'acr' , width: 150 , align: 'center' , type: 'numeric' },
                    { title: <div className="hasTooltip">Market Cap<span className="tooltip">Sort by Market Cap</span></div>, field: 'mc' , width: 150 , align: 'center' , render: rowData => <div>$ {this.abbreviateNumber(rowData.mc)}</div> },
                    { title: <div className="hasTooltip">Market Volume<span className="tooltip">Sort by Market Volume</span></div>, field: 'v' , width: 150 , align: 'center' , render: rowData => <div>$ {this.abbreviateNumber(rowData.v)}</div>  },
                    { title: <div className="hasTooltip">Market Dominance<span className="tooltip">Sort by Market Dominance</span></div>, field: 'd' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.d} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />%</div>  },
                    { title: <div className="hasTooltip">Volatility<span className="tooltip">Sort by Volatility</span></div>, field: 'vt' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.vt} displayType={'text'} thousandSeparator={true} decimalScale={3} fixedDecimalScale={true} /></div>  },
                    { title: <div className="hasTooltip">Circulating Supply<span className="tooltip">Sort by Circulating Supply</span></div>, field: 'mc' , width: 150 , align: 'center' , render: rowData => <div>{this.abbreviateNumber(rowData.mc / rowData.p)} {rowData.s}</div>  },
                    { title: <div className="hasTooltip">Social Volume<span className="tooltip">Sort by Social Volume</span></div>, field: 'sv' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.sv} displayType={'text'} thousandSeparator={true} /></div> },
                    { title: <div className="hasTooltip">Social Engagement<span className="tooltip">Sort by Social Engagement</span></div>, field: 'ss' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.ss} displayType={'text'} thousandSeparator={true} /></div> },
                    { title: <div className="hasTooltip">Social Contributors<span className="tooltip">Sort by Social Contributors</span></div>, field: 'c' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.c} displayType={'text'} thousandSeparator={true} /></div> },
                    { title: <div className="hasTooltip">Social Dominance<span className="tooltip">Sort by Social Dominance</span></div>, field: 'sd' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.sd} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />%</div> },
                    { title: <div className="hasTooltip">Average Sentiment<span className="tooltip">Sort by Average Sentiment</span></div>, field: 'as' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.as} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />%</div> },
                    { title: <div className="hasTooltip">Bullish Sentiment<span className="tooltip">Sort by Bullish Sentiment</span></div>, field: 'bl' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.bl} displayType={'text'} thousandSeparator={true} /></div>  },
                    { title: <div className="hasTooltip">Bearish Sentiment<span className="tooltip">Sort by Bearish Sentiment</span></div>, field: 'br' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.br} displayType={'text'} thousandSeparator={true} /></div>  },
                    { title: <div className="hasTooltip">Shared Links<span className="tooltip">Sort by Shared Links</span></div>, field: 'u' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.u} displayType={'text'} thousandSeparator={true} /></div>  },
                    { title: <div className="hasTooltip">Twitter Volume<span className="tooltip">Sort by Twitter Volume</span></div>, field: 't' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.t} displayType={'text'} thousandSeparator={true} /></div>  },
                    { title: <div className="hasTooltip">Reddit Volume<span className="tooltip">Sort by Reddit Volume</span></div>, field: 'r' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.r} displayType={'text'} thousandSeparator={true} /></div>  },
                    { title: <div className="hasTooltip">Medium Volume<span className="tooltip">Sort by Medium Volume</span></div>, field: 'md' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.md} displayType={'text'} thousandSeparator={true} /></div>  },
                    { title: <div className="hasTooltip">Youtube Volume<span className="tooltip">Sort by Youtube Volume</span></div>, field: 'yt' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.yt} displayType={'text'} thousandSeparator={true} /></div>  },
                    { title: <div className="hasTooltip">News Volume<span className="tooltip">Sort by News Volume</span></div>, field: 'na' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.na} displayType={'text'} thousandSeparator={true} /></div>  },
                    { title: <div className="hasTooltip">Spam Volume<span className="tooltip">Sort by Spam Volume</span></div>, field: 'sp' , width: 150 , align: 'center' , render: rowData => <div><NumberFormat value={rowData.sp} displayType={'text'} thousandSeparator={true} /></div>  },
                ]}
                data={this.state.marketsData}
                />
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount(){
        this.setState({ loading: true });
        fetch('https://api.lunarcrush.com/v2?data=meta&key=12jj7svid98m4xyvzmaalk4&type=full')
            .then(function(response) {
                return response.json();
            })
            .then(res => {
                var myMap = res.data.reduce(function(map, obj) {
                    map[obj.symbol] = obj;
                    return map;
                }, {});
                fetch('https://api.lunarcrush.com/v2?data=market&key=12jj7svid98m4xyvzmaalk4&sort=mc&desc=true')
                    .then(function(response) {
                        return response.json();
                    })
                    .then(res => {
                        this.setState({ metaData: myMap, marketsData: res.data, loading: false })
                    })
            })
        
    }
  }
  export default MarketsTable;