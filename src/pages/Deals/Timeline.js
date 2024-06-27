import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from "highcharts/highcharts-more"; 

HC_more(Highcharts);

const chartOptions = {
    chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy',
        width: 1200,
        // backgroundColor: 'rbg(255,255,255)',
        plotBackgroundColor: 'rgb(204,224,247)',
        plotBorderColor: 'rgb(255, 255, 255)'
    },
    credits: {
        enabled: false,
    },
    legend: {
        enabled: false,
    },
    title: {
        text: 'Meetings and Emails',
    },
    xAxis: {
        type: 'datetime',
        title: {
            text: 'Month of',
            align: 'left',
            x: 10,
            y: 25,
            style: {
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#000000', // Change the color of the subtitle text
            },
        },
        tickInterval: 30 * 24 * 3600 * 1000,
        labels: {
            formatter: function () {
                console.log("Hello:")
                console.log(this.value);
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
            formatter: function() {
                return this.value === 2 ? 'Meetings' : this.value === 1? 'Emails': '';
            },
            x: -100,
        },
        tickPositions: [0, 1, 2, 3],
    },
    tooltip: {
        pointFormatter: function () {
        const seriesName = this.series.name;
        // const date = new Date(this.x).toLocaleDateString();
        // const value = this.y;
        const num = this.z;
        return `Number of ${seriesName}: ${num}`;
        },
    },
    series: [],
};

export const Timeline = ({meetingData,emailData}) => {

    const chartRef = useRef(null);

    useEffect( () => {
        if(chartRef.current){
            const mychart = chartRef.current.chart;
            let meetingsCount = {};
            meetingData.searchResults[0].entities.map((meeting) => {
                let meetingdata = meeting.data[0];
                const meetingDate = new Date(meetingdata.startDate);
                const month = meetingDate.getMonth();
                const year = meetingDate.getFullYear();
                meetingDate.setDate(new Date(year, month + 1, 0).getDate());
                meetingDate.setHours(0, 0, 0, 0);
                const formattedDate = meetingDate.getTime();
                // return {
                    //     x: formattedDate,
                    //     y: 2,
                    //     z: meeting.meetings,
                // };
                if (meetingsCount[formattedDate]) {
                    meetingsCount[formattedDate]++;
                } else {
                    meetingsCount[formattedDate] = 1;
                }
            });
            const formattedMeetingsData = [];
            for (let lastDay in meetingsCount) {
                formattedMeetingsData.push({
                    x: parseInt(lastDay, 10),
                    y: 2,
                    z: meetingsCount[lastDay]
                });
            }
            // console.log(meetingsCount);
            console.log(formattedMeetingsData);
            // formattedMeetingsData = meetingsCount.map()
            let emailsCount = {};
            emailData.map((email) => {
                const emailDate = new Date(email.sendDatetime);
                const month = emailDate.getMonth();
                const year = emailDate.getFullYear();
                emailDate.setDate(new Date(year, month + 1, 0).getDate());
                emailDate.setHours(0, 0, 0, 0);
                const formattedDate = emailDate.getTime();
                if (emailsCount[formattedDate]) {
                    emailsCount[formattedDate] ++;
                } else {
                    emailsCount[formattedDate] = 1
                }
                // return {
                //     x: formattedDate,
                //     y: 1,
                //     z: email.emails,
                // };
            });
            const formattedEmailsData = [];
            for (let lastDay in emailsCount) {
                formattedEmailsData.push({
                    x: parseInt(lastDay, 10),
                    y: 1,
                    z: emailsCount[lastDay]
                });
            }
            // console.log(emailsCount);
            console.log(formattedEmailsData);
            mychart.update({
                series: [
                    {
                        name: 'Meetings',
                        type: 'bubble',
                        data: formattedMeetingsData,
                        color: 'orange',
                        borderColor: 'white',
                        borderWidth: 5,
                    },
                    {
                        name: 'Emails',
                        type: 'bubble',
                        data: formattedEmailsData,
                        color: 'blue',
                        borderColor: 'white',
                        borderWidth: 5,
                    },
                ]
            }, true, true);
        }
        
    } ,[meetingData,emailData]);

    

    return (
        <div>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              ref={chartRef}
              />
        </div>
    )
}