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
import ViewColumn from '@material-ui/icons/ViewColumn';
import CssBaseline from '@material-ui/core/CssBaseline';
import NumberFormat from 'react-number-format';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Moment from 'react-moment';
import { format } from "d3-format";

const volumeFormat = format(".2s");
const priceFormat = format(",.2f");

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

class MarketsPairsTable extends Component {
    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
        this.coin = props.coin;
    }
    
    state = {
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
            pageSize: 100,
            pageSizeOptions: [100],
            isLoading: true,
            search: false,
            sorting: true,
            loadingType: 'overlay',
            headerStyle: {
                fontWeight: 'bold'
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
                    columns={[
                        { title: <div className="hasTooltip">Rank<span className="theTooltip">Sort by Rank</span></div>, field: 'tableData.id', align: 'center' , render: rowData => rowData.tableData.id + 1  },
                        { title: <div className="hasTooltip">Exchange<span className="theTooltip">Sort by Exchange</span></div>, field: 'exchange' , align: 'center' , render: rowData => <div style={{display: 'flex', alignItems: 'left'}}><div style={{margin: 5, textAlign: 'center'}}> <img style={{ width: 28, height: 28, borderRadius: '50%' }} src={rowData.logo}/></div><div style={{margin: 5, textAlign: 'left'}}>{rowData.name}</div></div>},
                        { title: <div className="hasTooltip">Market<span className="theTooltip">Sort by Market</span></div>, field: 'market_sort' , align: 'center'},
                        { title: <div className="hasTooltip">Price<span className="theTooltip">Sort Price</span></div>, field: 'price' , align: 'center' , render: rowData => <div><NumberFormat value={rowData.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></div> },
                        { title: <div className="hasTooltip">Volume 24h<span className="theTooltip">Sort by Volume 24h</span></div>, field: '1d_volume' , align: 'center' , render: rowData => <div>${volumeFormat(rowData['1d_volume'])}</div> },
                        { title: <div className="hasTooltip">Volume 30d<span className="theTooltip">Sort by Volume 30d</span></div>, field: '30d_volume' , align: 'center' , render: rowData => <div>${volumeFormat(rowData['30d_volume'])}</div> },
                        { title: <div className="hasTooltip">Type<span className="theTooltip">Sort by Type</span></div>, field: 'type' , width: 150 , align: 'center' },
                        { title: <div className="hasTooltip">Updated<span className="theTooltip">Sort by Updated</span></div>, field: 'last_updated' , align: 'center' , render: rowData => <div><Moment fromNow>{new Date(rowData.last_updated * 1000)}</Moment></div>},
                    ]}
                    data={query =>
                        new Promise((resolve, reject) => {
                          let url = 'https://api.lunarcrush.com/v2?data=market-pairs&key=12jj7svid98m4xyvzmaalk4'
                          url += '&page=' + (query.page)
                          url += '&symbol' + this.coin
                          fetch(url)
                            .then(response => response.json())
                            .then(result => {
                                resolve({
                                    data: result.data[0].marketPairs,
                                    page: result.config.page ? result.config.page : 0,
                                    totalCount: result.data[0].total_rows,
                                })
                            })
                        })
                    }
                />
                </MuiThemeProvider>
            </div>
        );
    }

    componentDidMount(){
        
    }

    componentWillUpdate () {
        
    }

  }
  export default MarketsPairsTable;