import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from "highcharts/highcharts-more";

HC_more(Highcharts);

let yAxisLabels = ['Meetings', 'Emails'];

const chartOptions = {
    chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy',
        width: 1100,
        plotBackgroundColor: 'rgb(231,222,255)',
        plotBorderColor: 'rgb(255, 255, 255)'
    },
    credits: {
        enabled: false,
    },
    legend: {
        enabled: false,
    },
    title: {
        text: 'TimeLine Chart',
    },
    xAxis: {
        type: 'datetime',
        // title: {
        //     text: 'Week of',
        //     align: 'low',
        //     offset: 17,
        //     x: -100,
        //     style: {
        //         fontWeight: 'bold',
        //         fontSize: '14px',
        //         color: '#000000', // Change the color of the subtitle text
        //     },
        // },
        tickInterval: 30 * 24 * 3600 * 1000,
        labels: {
            formatter: function () {
                return Highcharts.dateFormat('%Y-%m-%d', this.value);
            },
            style: {
                color: 'rgb(139, 139, 160)'
            }
        },
        lineWidth: 0,
        tickLength: 0,
        opposite: true,
    },
    yAxis: {
        title: {
            text: '',
        },
        labels: {
            // formatter: function() {
            //     return this.value === 1 ? 'Meetings' : this.value === 0? 'Emails': '';
            // },
            // x: -50,
            enabled: false,
        },
        // tickInterval: 1,
        // tickPositions: [-1, 0, 1, 2, 3],
    },
    plotOptions: {
        bubble: {
            minSize: 12,
            maxSize: 48,
            cursor: 'pointer',
            states: {
                hover: {
                    enabled: false, // Disable the hover effect
                },
                inactive: {
                    enabled: false, // Disable the inactive (transparent) state
                },
            },
        },
        series: {
            marker: {
                fillColor: null,  // to make it inherit from series
                lineWidth: 1.2,
                lineColor: 'white'
            },
        },
    },
    tooltip: {
        useHTML: true,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        formatter: function() {
            const bubbleColor = this.point.color || this.series.color;
            return `<div style="background-color:${bubbleColor}; padding:3px; border-radius:5px; color:white; font-size: 11px;">
                        Number of ${this.series.name}: ${this.point.z}
                    </div>`;
        },
    },
    series: [],
};

export const Timeline = ({timelineData}) => {

    const chartRef = useRef(null);
    const [showParticipants, setShowParticipants] = useState(false);

    useEffect( () => {
        if(chartRef.current){
            const mychart = chartRef.current.chart;

            // Meetings Data
            let meetingsCount = {};
            timelineData.contacts.map((contact) => {
                contact.conversation.data.forEach((eachData) => {
                    const meetingsDate = new Date(eachData.endDate);
                    const formattedDate = meetingsDate.getTime();
                    let count = 0;
                    for(let i in eachData.convIds) {
                        count += eachData.convIds[i].length;
                    }
                    if(count > 0) {
                        if (meetingsCount[formattedDate]) {
                            meetingsCount[formattedDate] += count;
                        } else {
                            meetingsCount[formattedDate] = count;
                        }
                    }
                });
            });
            let formattedMeetingsData = [];
            for (let lastDay in meetingsCount) {
                formattedMeetingsData.push({
                    x: parseInt(lastDay, 10),
                    y: 1,
                    z: meetingsCount[lastDay]
                });
            }
            // console.log(meetingsCount);
            // console.log(formattedMeetingsData);

            // Emails Data
            let emailsCount = {};
            timelineData.contacts.map((contact) => {
                contact.conversation.data.forEach((eachData) => {
                    const emailsDate = new Date(eachData.endDate);
                    const formattedDate = emailsDate.getTime();
                    if(eachData.emails) {
                        if (emailsCount[formattedDate]) {
                            emailsCount[formattedDate] += eachData.emails;
                        } else {
                            emailsCount[formattedDate] = eachData.emails;
                        }
                    }
                });
            });
            let formattedEmailsData = [];
            for (let lastDay in emailsCount) {
                formattedEmailsData.push({
                    x: parseInt(lastDay, 10),
                    y: 0,
                    z: emailsCount[lastDay]
                });
            }
            // console.log(emailsCount);
            // console.log(formattedEmailsData);

            let graphData = [];
            graphData.push({
                useHTML: true,
                name: 'Meetings',
                type: 'bubble',
                data: formattedMeetingsData,
                color: 'rgb(242,167,30)',
                borderColor: 'white',
                borderWidth: 5,
            });
            graphData.push({
                name: 'Emails',
                type: 'bubble',
                data: formattedEmailsData,
                color: 'rgb(77,161,255)',
                borderColor: 'white',
                borderWidth: 5,
            });
            graphData.push ({
                name:'',
                type:'bubble',
                data: [],
            })
            
            // Individual Participants Data
            let i = 2;
            timelineData.contacts.map((contact) => {
                formattedEmailsData = [];
                formattedMeetingsData = [];
                meetingsCount = {};
                emailsCount = {};
                const participantName = contact.name;
                if (!yAxisLabels.includes(participantName))
                    yAxisLabels.push(participantName);
                contact.conversation.data.forEach((eachData) => {
                    const meetingsDate = new Date(eachData.endDate);
                    const formattedDate = meetingsDate.getTime();
                    let count = 0;
                    for(let i in eachData.convIds) {
                        count += eachData.convIds[i].length;
                    }
                    if(count > 0) {
                        if (meetingsCount[formattedDate]) {
                            meetingsCount[formattedDate] += count;
                        } else {
                            meetingsCount[formattedDate] = count;
                        }
                    }
                    if(eachData.emails) {
                        if (emailsCount[formattedDate]) {
                            emailsCount[formattedDate] += eachData.emails;
                        } else {
                            emailsCount[formattedDate] = eachData.emails;
                        }
                    }
                });
                for (let lastDay in meetingsCount) {
                    formattedMeetingsData.push({
                        x: parseInt(lastDay, 10),
                        y: -i,
                        z: meetingsCount[lastDay]
                    });
                }
                for (let lastDay in emailsCount) {
                    formattedEmailsData.push({
                        x: parseInt(lastDay, 10),
                        y: -i,
                        z: emailsCount[lastDay]
                    });
                }
                graphData.push({
                    name: 'Meetings',
                    type: 'bubble',
                    data: showParticipants? formattedMeetingsData: [],
                    color: 'rgb(242,167,30)',
                    borderColor: 'white',
                    borderWidth: 5,
                });
                graphData.push({
                    name: 'Emails',
                    type: 'bubble',
                    data: showParticipants? formattedEmailsData: [],
                    color: 'rgb(77,161,255)',
                    borderColor: 'white',
                    borderWidth: 5,
                });
                i++;
            });
            // console.log(yAxisLabels);
            mychart.update({
                series: graphData,
                // yAxis: {
                //     labels: {
                //         formatter: function() {
                //             let label = '';
                //             if(this.value === 0 && this.value === 1)
                //                 label = yAxisLabels[this.value]; 
                //             else {
                //                 label = yAxisLabels[(-this.value)+1];
                //             }
                //             return label;
                //         },
                //     },
                // },
            }, true, true);
        }
        
    } ,[timelineData, showParticipants]);

    function toggleParticipants() {
        if(showParticipants === true) {
            yAxisLabels = ['Meetings', 'Emails']
        }
        setShowParticipants(!showParticipants);
    }

    return (
        <div>
            <div style={{display: 'flex', backgroundColor:'white', paddingLeft: '10px'}}>
                <div>
                    <ul style={{listStyle: 'none', height:  '300px', display:"flex", flexDirection:"column", justifyContent:"space-evenly", margin: '0', padding: '0'}}>
                        <div style={{fontWeight: 'bolder'}}>Week Of</div>
                        {
                            yAxisLabels.map((label, index) => {
                                if(index === 0 || index === 1)
                                    return (
                                        <li>{label}</li>
                                    )
                            })
                        }
                    </ul>
                    <button onClick={toggleParticipants} style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer', margin: '0 10px'}}>Participants</button>
                    {yAxisLabels.length > 2 && <ul style={{listStyle: 'none', height: '200px', display:"flex", flexDirection:"column", justifyContent:"space-evenly",  margin: '0', padding: '0 0 23px 0'}}>
                        {
                            yAxisLabels.map((label, index) => {
                                if(index !== 0 && index !== 1)
                                    return (
                                        <li style={{fontSize: '70%'}}>{label}</li>
                                    )
                            })
                        }
                    </ul>}
                </div>
                <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                ref={chartRef}
                />
            </div>
        </div>
    )
}