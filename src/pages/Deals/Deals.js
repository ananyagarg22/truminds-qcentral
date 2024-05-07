import React, {useEffect, useRef} from 'react'
import './Deals.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from "highcharts/highcharts-more"; 
import { dealsQuadrantData } from './dealsQuadrantData';
import { dealsLineData } from './dealsLineData';

HC_more(Highcharts);

const QuadrantChart = ({data}) => {
  const chartRef = useRef(null);

  useEffect(() => {
      if (chartRef.current) {
          const chart = chartRef.current.chart;
          // Calculate totals for each quadrant
          const totals = { q1: 0, q2: 0, q3: 0, q4: 0 };
          data.forEach(function(point) {
              // for exploratory
              if(point.opptyRisk === "On track"){
                if(point.opptyAmount === undefined){
                  totals.q1 += 0;
                } else {
                  totals.q1 += point.opptyAmount;
                }
              }
              // for at risk
              else if (point.opptyRisk === "At risk"){
                if(point.opptyAmount === undefined){
                  totals.q3 += 0;
                } else {
                  totals.q3 += point.opptyAmount;
                }
              }
              // // for exceeding
              // // else if (true) {

              // // } 
              // for dormant
              else {
                var isEngagementPresent = false;
                for(var i=0;i<point.score.length;i++) {
                  if(point.score[i].type === "engagement"){
                    isEngagementPresent = true;
                  }
                }
                if(isEngagementPresent === false){
                  if(point.opptyAmount === undefined){
                    totals.q4 += 0;
                  } else {
                    totals.q4 += point.opptyAmount;
                  }
                }
              } 
              
              // if (point.x > 10 && point.y > 10) {
              //     totals.q4 += point.size;
              // } else if (point.x <= 10 && point.y > 10) {
              //     totals.q3 += point.size;
              // } else if (point.x <= 10 && point.y <= 10) {
              //     totals.q2 += point.size;
              // } else {
              //     totals.q1 += point.size;
              // }

          });
          // Update the series with quadrant totals
          chart.update({
              series: [{
                  name: 'Quadrant Totals',
                  type: 'bubble',
                  data: [{
                      x: 5, y: 5, z: totals.q3
                  }, {
                      x: 15, y: 5, z: totals.q4
                  }, {
                      x: 5, y: 15, z: totals.q1
                  }, {
                      x: 15, y: 15, z: totals.q2
                  }],
                  marker: {
                      fillColor: 'rgba(128, 128, 128, 0.5)',
                      lineWidth: 0,
                      lineColor: 'rgba(128, 128, 128, 1)'
                  }
              }]
          }, true, true);
      }
  }, [data]);

  const quadrantChartOptions = {
    chart: {
        type: 'bubble',
    },
    title: {
        text: ''
    },
    xAxis: {
        title: {
            text: ''
        },
        min: 0,
        max: 20,
        tickInterval: 0,
        plotLines: [{
            color: 'rgba(128, 128, 128, 0.5)',
            dashStyle: 'dash',
            width: 1,
            value: 10
        }]
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0,
        max: 20,
        tickInterval: 0,
        plotLines: [{
            color: 'rgba(128, 128, 128, 0.5)',
            dashStyle: 'dash',
            width: 1,
            value: 10
        }]
    },
    plotOptions: {
        bubble: {
            tooltip: {
                headerFormat: '<b>{point.name}</b><br>',
                pointFormat: 'Size: {point.z}'
            }
        }
    },
    series: [{
      name: 'Quadrant Totals',
      type: 'bubble',
      data: [{
          name: 'At Risk',
          x: 5, y: 5, z: 1,
          // fillColor: 'rgba(204,224,247,1)',
          color: 'rgba(204,224,247,1)' // Quadrant 1 color
      }, {
          name: 'Dormant',
          x: 15, y: 5, z: 1,
          // fillColor: 'rgba(204,226,215,1)',
          color: 'rgba(204,226,215,1)' // Quadrant 2 color
      }, {
          name: 'Exploratory',
          x: 5, y: 15, z: 1,
          // fillColor: 'rgba(226,226,228,1)',
          color: 'rgba(226,226,228,1)' // Quadrant 3 color
      }, {
          name: 'Exceeding',
          x: 15, y: 15, z: 1,
          // fillColor: 'rgba(238,204,204,1)',
          color: 'rgba(238,204,204,1)' // Quadrant 4 color
      },],
      marker: {
          enabled: true
      }
  }]
}

  return (
      <HighchartsReact
          highcharts={Highcharts}
          options={quadrantChartOptions}
          ref={chartRef}
      />
  );
};

// var data = [
//   { x: 5, y: 5, size: 10 },
//   { x: 10, y: 15, size: 20 },
//   { x: 15, y: 10, size: 15 },
//   { x: 20, y: 20, size: 25 }
// ];

const LineChart = ({ data }) => {
  const dateData = data.map(item => {
    // Construct a date object using month and year
    const formattedDate = new Date(`${item.year}-${item.month}-01`).toLocaleString('en-US', { month: 'short', year: 'numeric' });
    return [formattedDate, item.dealCycle, item.sentiment*100, item.won*100];
  });

  var maxValueForDealCycle = 0;

  maxValueForDealCycle = dateData.map(item => item[1] > maxValueForDealCycle? item[1]: maxValueForDealCycle);

  const lineChartOptions = {
    chart: {
        type: 'line',
        plotBackgroundColor: '#fff',
        height: '300',
        zoomType: 'xy',
        backgroundColor: 'transparent',
        borderRadius: '12',
        padding: '20',
        animation: false,
        plotBorderWidth: 0,
        ignoreHiddenSeries: false,
    },
    credits: {
        enabled: false,
    },
    rangeSelector: {
        selected: 1,
    },
    title: {
        text: ''
    },
    // legend: {
    //     align: 'center',
    //     verticalAlign: 'bottom',
    //     symbolPadding: 0,
    //     symbolWidth: 0,
    //     symbolHeight: 0,
    //     squareSymbol: false,
    //     // FontFace: 'Poppins',
    //     itemStyle: {
    //         color: '#333333',
    //         fontWeight: '400',
    //         fontSize: '14px',
    //         // fontFamily: 'Poppins Regular',
    //     },
    //     useHTML: true,
    //     // labelFormatter() {
    //     //     return renderToString(<Provider store={store}>{getInfoTooltip(legendText[this.color], this.color)}</Provider>);
    //     // },
    // },
    xAxis: {
        categories: dateData.map(item => item[0]),
        crosshair: {
            zIndex: 8,
            color: 'rgb(224, 222, 222,0.50)',
        },
        labels: {
            align: 'center',
            style: {
                // color: `${theme.UniphoreCoolGrey}`,
                // fontSize: `${theme.fontSizeSmall}`,
                fontSize: '10px',
                // fontFamily: `${theme.fontFamilyMedium} !important`,
            },
        },
    },
    yAxis: [
      {
        min: 0,
        max: 100,
        tickAmount: 3,
        startOnTick: false,
        labels: {
            align: 'right',
            x: -3,
            format: '{value}%',
            style: {
                color: '#757878',
            },
        },
        title: {
          text: 'Win %/ Customer Sentiment',
          x: -10,
        },
        resize: {
            enabled: true,
        },
        gridLineDashStyle: 'longdash',
      },
      {
        min: 0,
        max: maxValueForDealCycle,
        tickAmount: 3,
        startOnTick: false,
        labels: {
            align: 'right',
            format: '{value}m',
            style: {
                color: '#757878',
            },
        },
        title: {
          text: 'Deal Cycle (Month)',
          x: 15,
        },
        gridLineDashStyle: 'longdash',
        resize: {
            enabled: true,
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
      split: false,
      outside: true,
      useHTML: true,
      followPointer: true,
      borderWidth: 0,
      borderRadius: 5,
      zIndex: 100,
      shadow: true,
  },
    series: [
      {
          name: 'Deal Cycle',
          type: 'spline',
          data: dateData.map(item => item[1]),
          color: '#7D55C7',
          marker: {
              symbol: 'circle',
              enabled: true,
              fillColor: '#FFFFFF',
              lineWidth: 2,
              lineColor: null,
          },
          // visible: trend[data[0]?.name],
          // opacity: trend[data[0]?.name] ? 1 : 0.3,
      },
      {
          name: 'Sentiment',
          type: 'spline',
          data: dateData.map(item => item[2]),
          color: '#006D38',
          marker: {
              symbol: 'circle',
              enabled: true,
              fillColor: '#FFFFFF',
              lineWidth: 2,
              lineColor: null,
          },
          // visible: trend[data[1]?.name],
          // opacity: trend[data[1]?.name] ? 1 : 0.3,
      },
      {
          name: 'Win Percentage',
          type: 'spline',
          // yAxis: 1,
          data: dateData.map(item => item[3]),
          color: '#0062D6',
          marker: {
              symbol: 'circle',
              enabled: true,
              fillColor: '#FFFFFF',
              lineWidth: 2,
              lineColor: null,
          },
          // visible: trend[data[2]?.name],
          // opacity: trend[data[2]?.name] ? 1 : 0.3,
      },
    ],
    plotOptions: {
      series: {
          connectNulls: true,
          marker: {
              enabled: true,
              states: {
                  hover: {
                      enabled: false,
                  },
              },
          },
          zoneAxis: 'x',
          // zones: [
          //     {
          //         value: zoneCurrentMonthIndex,
          //     },
          //     {
          //         value: zoneLastMonthIndex + 1,
          //         dashStyle: 'Dash',
          //     },
          // ],
          states: {
              inactive: {
                  opacity: 1,
              },
          },
          // events: {
          //     legendItemClick() {
          //         const series = this;
          //         setTrend({ ...trend, [this?.name]: !trend[this.name] });
          //         series.update({
          //             opacity: series.opacity === 0.3 ? 1 : 0.3,
          //         });
          //         return false; // Prevent default behavior
          //     },
          // },
      },
      spline: {
          zIndex: 2,
          connectNulls: true,
          borderWidth: 0,

          // events: {
          //     click(chartContext) {
          //         handleClickOnPoint(chartContext);
          //     },
          // },
      },
    },
};

  return (
      <HighchartsReact
          highcharts={Highcharts}
          options={lineChartOptions}
      />
  );
};

function Deals() {
  return (
    <div id="dealspage">
      <div id='title'>
        Deals
      </div>
      <div id="dialoguebox">
        <div id='dialogueboxheading'>
          <b>Deal Standings</b>
        </div>
        <div id="quadrantChart">
          <QuadrantChart data={dealsQuadrantData}/>
        </div>
      </div>
      <div id="dialoguebox">
        <div id='dialogueboxheading'>
          <b>Metrics over last year</b>
        </div>
        <div id="lineChart">
          <LineChart data={dealsLineData}/>
        </div>
      </div>
    </div>
  )
}

export default Deals;