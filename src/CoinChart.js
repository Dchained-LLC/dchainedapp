import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints =[];

class CoinChart extends Component {
    constructor(props) {
        super(props);
        this.value = props.value;
        this.updatePage = props.updatePage;
        this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], isLoaded: false };
    }

  render() {
    const options = {
      exportEnabled: false,
      title: {
        text: ""
    },
    axisX: {
		valueFormatString: "D MMM"
	},
    axisY: {
		title: "Price",
		prefix: "$"
	},
    data: [{				
        type: "candlestick",
        name: "BTC Price",
        showInLegend: false,
				yValueFormatString: "$##0.00",
        xValueType: "dateTime",
        risingColor: "green",
			  fallingColor: "red",
				dataPoints: dataPoints
       }]
   }
		
   return (
      <div>
        <CanvasJSChart options = {options}
          onRef = {ref => this.chart = ref}
        />
      </div>
    );
  }
  componentDidMount(){
    var chart = this.chart;
    fetch('https://api.lunarcrush.com/v2?data=assets&key=12jj7svid98m4xyvzmaalk4&symbol=' + this.value)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
            var dps1 = [], dps2 = [], dps3 = [];
            var timeSeries = data.data[0].timeSeries;
                    for (var i = 0; i < timeSeries.length; i++) {
                        dataPoints.push({
                            x: timeSeries[i].time,
                            y: [timeSeries[i].open, timeSeries[i].high, timeSeries[i].low, timeSeries[i].close]
                        });
            }
            changeBorderColor(chart);
			chart.render();
		});
	}
}
export default CoinChart;

function changeBorderColor(chart){
	var dataSeries;
	for( var i = 0; i < chart.options.data.length; i++){
  		dataSeries = chart.options.data[i];
      for(var j = 0; j < dataSeries.dataPoints.length; j++){
        dataSeries.dataPoints[j].color = (dataSeries.dataPoints[j].y[0] <= dataSeries.dataPoints[j].y[3]) ? (dataSeries.risingColor ? dataSeries.risingColor : dataSeries.color) : (dataSeries.fallingColor ? dataSeries.fallingColor : dataSeries.color);
      }
	}
}