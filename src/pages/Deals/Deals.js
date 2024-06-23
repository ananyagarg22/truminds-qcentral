import React, {useEffect, useRef, useState} from 'react'
import './Deals.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from "highcharts/highcharts-more"; 
import { dealsQuadrantData } from './dealsQuadrantData';
import { dealsLineData } from './dealsLineData';
import {Timeline} from './Timeline';

import {meetingData} from './meetingdata.js';
import {emailData} from './emaildata.js';

HC_more(Highcharts);

const QuadrantChart = ({data}) => {
  const chartRefAtRisk = useRef(null);
  const chartRefExceeding = useRef(null);
  const chartRefExploratory = useRef(null);
  const chartRefDormant = useRef(null);
  
  const [currentTotals, setCurrentTotals] = useState({ q1: 0, q2: 0, q3: 0, q4: 0 });

  useEffect(() => {
      if (chartRefAtRisk.current || chartRefExceeding.current || chartRefExploratory.current || chartRefDormant.current) {
          const chartAtRisk = chartRefAtRisk.current.chart;
          const chartExceeding = chartRefExceeding.current.chart;
          const chartExploratory = chartRefExploratory.current.chart;
          const chartDormant = chartRefDormant.current.chart;
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

          });
          setCurrentTotals(totals);
          const maxTotalAmount = Math.max(totals.q1, totals.q2, totals.q3, totals.q4);
          // Method 1 of scaling
          // const totalSumZ = totals.q1 + totals.q2 + totals.q3 + totals.q4;
          // const scalingFactor = totalSumZ > 0 ? Math.min(200 / maxTotalAmount, 1) : 1;
          // const scalingFactorQ1 = scalingFactor;
          // const scalingFactorQ2 = scalingFactor;
          // const scalingFactorQ3 = scalingFactor;
          // const scalingFactorQ4 = scalingFactor;
          // const zQ1 = totals.q1 * scalingFactor;
          // const zQ2 = totals.q2 * scalingFactor;
          // const zQ3 = totals.q3 * scalingFactor;
          // const zQ4 = totals.q4 * scalingFactor;
          // Method 2 of scaling
          const scalingFactorQ1 = totals.q1 > 0 ? maxTotalAmount / totals.q1 : 1;
          const scalingFactorQ2 = totals.q2 > 0 ? maxTotalAmount / totals.q2 : 1;
          const scalingFactorQ3 = totals.q3 > 0 ? maxTotalAmount / totals.q3 : 1;
          const scalingFactorQ4 = totals.q4 > 0 ? maxTotalAmount / totals.q4 : 1;
          const zQ1 = totals.q1/scalingFactorQ1;
          const zQ2 = totals.q2/scalingFactorQ2;
          const zQ3 = totals.q3/scalingFactorQ3;
          const zQ4 = totals.q4/scalingFactorQ4; 
          // console.log("Updating values in Q3 with");
          // console.log(totals.q3);
          // console.log(scalingFactorQ3);
          // Update the series with quadrant totals
          chartAtRisk.update({
              series: [{
                  name: '',
                  type: 'bubble',
                  data: [{
                    x: 0, y: 0, z: zQ3, total: totals.q3, sf: scalingFactorQ3
                  }],
                  marker: {
                      fillColor: 'rgb(170,0,0)',
                      lineWidth: 0,
                      lineColor: 'rgb(170,0,0)'
                  }
              }]
          }, true, true);
          // console.log("Updating values in Q2 with");
          // console.log(totals.q2);
          // console.log(scalingFactorQ2);
          chartExceeding.update({
            series: [{
                name: '',
                type: 'bubble',
                data: [{
                  x: 0, y: 0, z: zQ2, total: totals.q2, sf: scalingFactorQ2
                }],
                marker: {
                    fillColor: 'rgba(0,255,0,1)',
                    lineWidth: 0,
                    lineColor: 'rgba(0,255,0,1)'
                }
            }]
          }, true, true);
          // console.log("Updating values in Q1 with");
          // console.log(totals.q1);
          // console.log(scalingFactorQ1);
          chartExploratory.update({
            series: [{
              name: '',
              type: 'bubble',
              data: [{
                x: 0, y: 0, z: zQ1, total: totals.q1, sf: scalingFactorQ1
              }],
              marker: {
                fillColor: 'rgb(0,98,214)',
                lineWidth: 0,
                lineColor: 'rgb(0,98,214)'
              }
            }]
          }, true, true);
          // console.log("Updating values in Q4 with");
          // console.log(totals.q4);
          // console.log(scalingFactorQ4);
          chartDormant.update({
            series: [{
                name: '',
                type: 'bubble',
                data: [{
                  x: 0, y: 0, z: zQ4, total: totals.q4, sf: scalingFactorQ4
                }],
                marker: {
                  fillColor: 'rgb(109,111,121)',
                  lineWidth: 0,
                  lineColor: 'rgb(109,111,121)'
                }
            }]
          }, true, true);
      }
  }, [data]);

  const quadrantChartOptions = {
    chart: {
        type: 'bubble',
        backgroundColor: 'transparent', 
        height: 700,
        width: 500,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: ''
    },
    legend: {
      enabled: false,
    },
    xAxis: {
        // title: {
        //     text: ''
        // },
        // lineWidth: 0,
        // tickInterval: 0,
        // tickWidth: 0,
        // minorTickWidth: 0,
        // labels: {
        //   enabled: false
        // },
        visible: false,
    },
    yAxis: {
        // title: {
        //     text: ''
        // },
        // tickInterval: 0,
        // tickWidth: 0,
        // minorTickWidth: 0,
        // labels: {
        //   enabled: false
        // },
        visible: false,
    },
    plotOptions: {
        bubble: {
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: 'Value: {point.total}<br>Scaling Factor: {point.sf}'
            }
        }
    },
}

  function valueFormatter(val) {
    var str = "USD ";
    if(val===0) {
      return "";
    }
    if(val<Math.pow(10,3)) {
      str += val;
    } else if (val>=Math.pow(10,3) && val<Math.pow(10,6)) {
      str += (val/Math.pow(10,3)).toFixed(3) + "K"
    } else if (val>=Math.pow(10,6) && val<Math.pow(10,9)) {
      str += (val/Math.pow(10,6)).toFixed(3) + "M"
    } else if (val>=Math.pow(10,9) && val<Math.pow(10,12)) {
      str += (val/Math.pow(10,9)).toFixed(3) + "B"
    } else if (val>=Math.pow(10,12) && val<Math.pow(10,15)) {
      str += (val/Math.pow(10,12)).toFixed(3) + "T"
    }
    return str;
  }

  return (
    <>
      <div id="quadrantRow">
        <div id="q1Container">
          <div id="quadrant" style={{backgroundColor: 'rgb(204,224,247)'}}>
            <HighchartsReact id="oneQuadrant"
              highcharts={Highcharts}
              options={quadrantChartOptions}
              ref={chartRefExploratory}
              />
            <div id="quadrantTitle">Exploratory</div>
            <div id="quadrantTotal">{valueFormatter(currentTotals.q1)}</div>
          </div>
        </div>
        <div id="q2Container">
          <div id="quadrant" style={{backgroundColor: 'rgb(204,226,215)'}}>
            <HighchartsReact id="oneQuadrant"
              highcharts={Highcharts}
              options={quadrantChartOptions}
              ref={chartRefExceeding}
              />
            <div id="quadrantTitle">Exceeding</div>
            <div id="quadrantTotal">{valueFormatter(currentTotals.q2)}</div>
          </div>
        </div>
      </div>
      <div id="quadrantRow">
        <div id="q3Container">
          <div id="quadrant" style={{backgroundColor: 'rgb(238,204,204)'}}>
            <HighchartsReact id="oneQuadrant"
              highcharts={Highcharts}
              options={quadrantChartOptions}
              ref={chartRefAtRisk}
              />
            <div id="quadrantTitle">At Risk</div>
            <div id="quadrantTotal">{valueFormatter(currentTotals.q3)}</div>
          </div>
        </div>
        <div id="q4Container">
          <div id="quadrant" style={{backgroundColor: 'rgb(226,226,228)'}}>
            <HighchartsReact id="oneQuadrant"
              highcharts={Highcharts}
              options={quadrantChartOptions}
              ref={chartRefDormant}
              />
            <div id="quadrantTitle">Dormant</div>
            <div id="quadrantTotal">{valueFormatter(currentTotals.q4)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const QuadrantChart2 = ({data}) => {
  const chartRefDeals = useRef(null);

  useEffect( () => {
    const tData=[];
    let tpositveEq = 0;
    let tnegativeEq = 0;
    if (chartRefDeals.current){
      const chartDeals = chartRefDeals.current.chart;
      data.forEach(function(point) {
        let engagementvalue=0;
        let sentimentvalue=0;
        
        for(var i=0;i<point.score.length;i++) {
          if(point.score[i].type==='engagement') {
            engagementvalue = point.score[i].value;
          }
          
          if(point.score[i].type==='sentiment') {
           sentimentvalue = point.score[i].value;
          }
        }
        if (engagementvalue * 100 && point.opptyStatus === 'active') {
          if (sentimentvalue > 0.5 && engagementvalue > 0.5) {
              tData.push({
                  x: sentimentvalue * 100,
                  y: engagementvalue * 100,
                  name: point.account?.name ?? '',
                  amount: point.opptyAmount,
                  z: point.opptyAmount,
                  opptyDate: point.opptyCreateDate,
                  oppty_id: point.id,
                  url: point.account.logoUrl,
              });
              tpositveEq++;
          } else if (sentimentvalue < 0.5 && engagementvalue > 0.5) {
              tData.push({
                  x: -sentimentvalue * 100,
                  y: engagementvalue * 100,
                  name: point.account?.name ?? '',
                  amount: point.opptyAmount,
                  z: point.opptyAmount,
                  opptyDate: point.opptyCreateDate,
                  oppty_id: point.id,
                  url: point.account.logoUrl,
              });
          } else if (sentimentvalue < 0.5 && engagementvalue < 0.5) {
              tData.push({
                  x: -sentimentvalue * 100,
                  y: -engagementvalue * 100,
                  name: point.account?.name ?? '',
                  amount: point.opptyAmount,
                  z: point.opptyAmount,
                  opptyDate: point.opptyCreateDate,
                  oppty_id: point.id,
                  url: point.account.logoUrl,
              });
              tnegativeEq++;
          } else if (sentimentvalue > 0.5 && engagementvalue < 0.5) {
              tData.push({
                  x: sentimentvalue * 100,
                  y: -engagementvalue * 100,
                  name: point.account?.name ?? '',
                  amount: point.opptyAmount,
                  z: point.opptyAmount,
                  opptyDate: point.opptyCreateDate,
                  oppty_id: point.id,
                  url: point.account.logoUrl,
              });
          }
        }
      });
      tData.map((data) => {
        data.y = data.y > 90 ? 87 : data.y;
    });

      chartDeals.update({
        series: [{
            name: '',
            type: 'bubble',
            data:tData,
            marker: {
                fillColor: 'rgb(170,0,0)',
                lineWidth: 0,
                lineColor: 'rgb(170,0,0)'
            }
        }]
    }, true, true);
    }
  } ,[data])

  const quadrantChartOptions2 = {
    chart: {
      type: 'bubble',
      plotBackgroundColor: '#fff',
      height: 350,
      width: 500,
      zoomType: 'xy',
      backgroundColor: 'transparent',
      borderRadius: '12',
      marginLeft: 50,
      marginTop: 40,
      className: 'teamQChart',
  },
  credits: {
      enabled: false,
    },
    title: {
      text: ''
    },
    legend: {
      enabled: false,
    },
    xAxis: [
      {
          title: {
              text: '',
          },
          min: -100,
          max: 100,
          tickInterval: 100,
          tickLength: 0,
          labels: {
              useHTML: true,
              formatter(value) {
                  if (value.value === -100) {
                      return '';
                  }
                  if (value.value === 100) {
                      return '';
                  }
                  return '<p style="font-size:12px;font-family:Poppins Bold !important;font-weight:700;padding:2px 10px;border-radius:10px;display:flex;align-items:center;margin-left:10px;color:#333333;margin-top:0px;">Engagement</p>';
              },
          },
          minorTickLength: 0,
          gridLineWidth: 1,
          lineColor: '#ccc',
          lineWidth: 1,
      },
      {
          title: {
              text: '',
          },
          min: -100,
          max: 100,
          tickInterval: 100,
          tickLength: 0,
          labels: {
              useHTML: true,
              formatter(value) {
                  if (value.value === -100) {
                      return '<p style="font-size:12px;font-weight:500;padding:2px 10px;border-radius:10px;display:flex;align-items:center;margin-left:10px;margin-top:15px;color:#8B8BA0;transform: translate(10px, 15px);">Low</p>';
                  }
                  if (value.value === 100) {
                      return '<p style="font-size:12px;font-weight:500;padding:2px 10px;border-radius:10px;display:flex;align-items:center;margin-right:30px;margin-top: 15px;color:#8B8BA0;transform: translate(0px, 15px);">High</p>';
                  }
              },
          },
          minorTickLength: 0,
          gridLineWidth: 1,
          lineColor: '#ccc',
          lineWidth: 1,
          opposite: true,
      },
  ],
  yAxis: [
      {
          title: {
              text: '',
              rotation: 0,
          },
          labels: {
              rotation: -90,
              useHTML: true,
              formatter(value) {
                  if (value.value === -105) {
                      return '';
                  }
                  if (value.value === 105) {
                      return '';
                  }
                  return '<p style="font-size:12px;font-family:Poppins Bold !important;font-weight:700;padding:2px 10px;border-radius:10px;display:flex;align-items:center;margin-right:17px;margin-left:12px;color:#333333;">Sentiment</p>';
              },
              autoRotation: 90,
              style: {
                  marginTop: '10px',
                  marginBottom: '10px',
              },
          },
          min: -105,
          max: 105,
          tickInterval: 105,
          tickLength: 3,
          minorTickLength: 0,
          lineColor: '#ccc',
          lineWidth: 1,
      },
      {
          title: {
              text: '',
              rotation: 0,
          },
          labels: {
              rotation: -90,
              useHTML: true,
              formatter(value) {
                  if (value.value === -100) {
                      return '<p style="font-size:12px;font-weight:500;border-radius:10px;display:flex;align-items:center;margin-right:-62px;color:#8B8BA0;margin-top:-5px">Negative</p>';
                  }
                  if (value.value === 100) {
                      return '<p style="font-size:12px;font-weight:500;border-radius:10px;display:flex;align-items:center;margin-top:-5px;color:#8B8BA0;margin-right:48px;">Positive</p>';
                  }
              },
              autoRotation: 90,
              style: {
                  marginLeft: '20px',
                  marginRight: '20px',
              },
          },
          min: -100,
          max: 100,
          tickInterval: 100,
          tickLength: 3,
          minorTickLength: 0,
          lineColor: '#ccc',
          lineWidth: 1,
          opposite: true,
      },
  ],
  series: [
    {
        type: 'bubble',
        color: '#4DA1FF',
        cursor: 'pointer',
        maxSize: 35,
        minSize: 10,
        allowPointSelect: true,
        // point: {
        //     events: {
        //         click() {
        //             handleClick(this);
        //         },
        //         mouseOver() {
        //             handleMouseOver(this);
        //         },
        //     },
        // },
        cluster: {
            enabled: false,
            dataLabels: {
                style: {
                    fontSize: '12px',
                    backgroundColor: '#00A3E0',
                },
                className: 'highlight',
                y: -1,
            },
            allowOverlap: false,
            animation: true,
            layoutAlgorithm: {
                type: 'grid',
                gridSize: 100,
            },
        },
        // data: dataBubble,
        // dataLabels: {
        //     enabled: false,
        //     useHTML: true,
        //     crop: false,
        //     overflow: 'none',
        //     formatter() {
        //         const { point } = this;
        //         return renderToString(<div className={point.selected === true ? 'blue' : ''}>test</div>);
        //     },
        //     y: 20,
        //     allowOverlap: false,
        // },
        marker: {
            enabled: true,
            symbol: 'circle',
            radius: 7,
        },
    },
],
  // plotOptions: {
  //     bubble: {
  //         tooltip: {
  //             headerFormat: '<b>{series.name}</b><br>',
  //             pointFormat: 'Value: {point.total}<br>Scaling Factor: {point.sf}'
  //         }
  //     }
  // },
  }
return(
  <div id='Quadrantchart2'>
  <HighchartsReact id="oneQuadrant"
    highcharts={Highcharts}
    options={quadrantChartOptions2}
    ref={chartRefDeals}
    />
  </div>

)
}

// var data = [
//   { x: 5, y: 5, size: 10 },
//   { x: 10, y: 15, size: 20 },
//   { x: 15, y: 10, size: 15 },
//   { x: 20, y: 20, size: 25 }
// ];

const LineChart = ({ data }) => {
  const tempDateData = data.map(item => {
    // Construct a date object using month and year
    const formattedDate = new Date(`${item.year}-${item.month}-01`).toLocaleString('en-US', { month: 'short', year: 'numeric' });
    const {months, weeks, days}  = convertDealCycle(item.dealCycle, false);
    return [formattedDate, months, item.sentiment*100, item.won*100];
  });
  
  var maxValueForDealCycle = 0;

  for (var index=0;index<tempDateData.length;index++) {
    var item = tempDateData[index];
    if (item[1] > maxValueForDealCycle) {
      maxValueForDealCycle = item[1]
    }
  }

  function convertDealCycle (d = 0, year = true) {
    let months = 0;
    let years = 0;
    let days = 0;
    let weeks = 0;
    while (d > 0) {
        if (d >= 365 && year) {
            years++;
            d -= 365;
        } else if (d >= 30) {
            months++;
            d -= 30;
        } else if (d >= 7) {
            weeks++;
            d -= 7;
        } else {
            days++;
            d--;
        }
    }
    return {
        years,
        months,
        weeks,
        days,
    };
  }

  const dateData = tempDateData;

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
          yAxis: 1,
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
      <div id="dialoguebox">
        <div id='dialogueboxheading'>
          <b> Bubble Chart </b>
        </div>
      <div id='quadrantchart2'>
          <QuadrantChart2 data={dealsQuadrantData}/>
        </div>
      </div>
      <div id="timelineChart">
        <Timeline meetingData={meetingData} emailData={emailData}/>
      </div>
    </div>
  )
}
export default Deals;