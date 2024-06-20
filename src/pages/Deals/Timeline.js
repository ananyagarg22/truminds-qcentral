import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

import HighchartsReact from 'highcharts-react-official';
import HC_more from "highcharts/highcharts-more"; 


const chartOptions = {
    chart: {
        type: 'bubble',
    },
    credits: {
        enabled: false,
    },
    legend: {
        enabled: true,
    },
    title: {
        text: 'Meetings, Emails, and Participants Over Time',
    },
    xAxis: {
        type: 'datetime',
        title: {
        text: 'Week',
        },
    },
    yAxis: {
        title: {
            text: '',
        },
        plotLines: [{
            value: 2, // Set the y-axis value for the line
            color: 'blue', // Match the color of the meetings series
            width: 2, // Line thickness
            label: {
              text: 'Meetings', // Label text
              align: 'left', // Align the label to the left
              style: {
                color: 'blue', // Match the color of the meetings series
              },
              x: 10, // Horizontal offset from the y-axis
              y: -5, // Vertical offset from the y-axis line
            },
          },
          {
            value: 1, // Set the y-axis value for the line
            color: 'yellow', // Match the color of the meetings series
            width: 2, // Line thickness
            label: {
              text: 'Emails', // Label text
              align: 'left', // Align the label to the left
              style: {
                color: 'yellow', // Match the color of the meetings series
              },
              x: 10, // Horizontal offset from the y-axis
              y: -5, // Vertical offset from the y-axis line
            },
          }],
          
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
    // series: [
    //     {
    //     name: 'Meetings',
    //     data: formattedMeetingsData,
    //     color: 'blue',
    //     },
    //     {
    //     name: 'Emails',
    //     data: formattedEmailsData,
    //     color: 'green',
    //     },
    //   {
    //     name: 'Participants',
    //     data: formattedMeetingsData.concat(formattedEmailsData), // Assuming participants data applies to both meetings and emails series
    //     color: 'purple',
    //   },
    // ],
};

HC_more(Highcharts);

export const Timeline = ({meetingData,emailData}) => {

    const chartRef = useRef(null);

    useEffect( () => {
        if(chartRef.current){
            const mychart = chartRef.current.chart;

            const formattedMeetingsData = meetingData.searchResults[0].entities.map((meeting) => {
                meeting = meeting.data;
                const meetingDate = new Date(meeting.startDate);
                const month = meetingDate.getMonth();
                const year = meetingDate.getFullYear();
                meetingDate.setDate(new Date(year, month + 1, 0).getDate());
                meetingDate.setHours(23, 59, 59, 999);
                const formattedDate = meetingDate.toLocaleDateString();
            
                return {
                    x: formattedDate,
                    y: 2,
                    z: meeting.meetings,
                };
            });
            
            const formattedEmailsData = emailData.map((email) => {
                const emailDate = new Date(email.sendDatetime);
                const month = emailDate.getMonth();
                const year = emailDate.getFullYear();
                emailDate.setDate(new Date(year, month + 1, 0).getDate());
                emailDate.setHours(23, 59, 59, 999);
                const formattedDate = emailDate.toLocaleDateString();
            
                return {
                    x: formattedDate,
                    y: 1, // Assuming participants data applies to both meetings and emails series
                    z: email.emails,
                };
            });
            

            mychart.update({
                series: [
                    {
                    name: 'Meetings',
                    data: formattedMeetingsData,
                    color: 'blue',
                    },
                    {
                    name: 'Emails',
                    data: formattedEmailsData,
                    color: 'green',
                    },
                ]
            })
        }
        
    } ,[meetingData,emailData])

    

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