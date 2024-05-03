import React, {useEffect, useRef} from 'react'
import './Deals.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from "highcharts/highcharts-more"; 
import { dealsQuadrantData } from './dealsQuadrantData';

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

  return (
      <HighchartsReact
          highcharts={Highcharts}
          options={{
              chart: {
                  type: 'bubble',
              },
              title: {
                  text: 'Quadrant Chart with Bubble Sizes'
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
                          headerFormat: '<b>{series.name}</b><br>',
                          pointFormat: 'Size: {point.z}'
                      }
                  }
              },
              series: [{
                name: 'Quadrant Totals',
                type: 'bubble',
                data: [{
                    x: 5, y: 5, z: 1,
                    // fillColor: 'rgba(204,224,247,1)',
                    color: 'rgba(204,224,247,1)' // Quadrant 1 color
                }, {
                    x: 15, y: 5, z: 1,
                    // fillColor: 'rgba(204,226,215,1)',
                    color: 'rgba(204,226,215,1)' // Quadrant 2 color
                }, {
                  x: 5, y: 15, z: 1,
                  // fillColor: 'rgba(226,226,228,1)',
                  color: 'rgba(226,226,228,1)' // Quadrant 3 color
                }, {
                    x: 15, y: 15, z: 1,
                    // fillColor: 'rgba(238,204,204,1)',
                    color: 'rgba(238,204,204,1)' // Quadrant 4 color
                },],
                marker: {
                    enabled: true
                }
            }]
          }}
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

function Deals() {
  return (
    <div id="dealspage">
      <div id='title'>
        Deals
      </div>
      <div id="dealstandingdialoguebox">
        <div id='dialogueboxheading'>
          <b>Deal Standings</b>
        </div>
        {/* <div id='quadrants'>
            <div className="quadrantrow">
              <div id="exploratory" className="quadrantcolumn">
                Exploratory
              </div>
              <div id="exceeding" className="quadrantcolumn">
                Exceeding
              </div>
            </div>
            <div className="quadrantrow">
              <div id="atrisk" className="quadrantcolumn">
                At risk
              </div>
              <div id="dormant" className="quadrantcolumn">
                Dormant
              </div>
            </div>
        </div> */}
        <div id="quadrants">
          <QuadrantChart data={dealsQuadrantData}/>
        </div>
      </div>
    </div>
  )
}

export default Deals;