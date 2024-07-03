import './Teams.css';
import React,{ useState, useEffect } from 'react';
import { teamsData } from './teamsData.js';

function Teams() {

    const [records,setRecords] = useState([])

//     useEffect(() => {
//         console.log('inside Use Effect');
//         fetch('https://sunstone-app-dev-devenv02.dev.uniphorecloud.com/usales/teams/summary')
//         .then(response => response.json())
//         .then(data => setRecords(data))
//         // .catch(err => console.log(err))
//     },[])
//     console.log(records);

        useEffect(() => {
            teamsDataCalculation();
        },[])

    function teamsDataCalculation() {

        const activeOppties = teamsData?.oppties?.filter((item) => item.status === 'active');
        const userStats = teamsData?.userStats;
        const users = teamsData?.users;

        let tableData = users.map((user) => { 
            
            return({
                'id':user.id,
                'teamMember': user.fullname,
                'noOfDeals': 0,
                'dealValue': 0,
                'customerSentiment': 0,
                'customerEngagement': 0,
                'meddic': 0,
                'sellerEQ': 0
            })
        })
        // console.log(tableData);
        activeOppties.forEach((oppty) => {
            const opptyId = oppty.id;
            // console.log('Looping thru activeOppties');
            // const requiredUserId = userStats.map((user,index) => {
            //     const userId = user.userId;
            //     if( opptyId in user) {
            //         if(opptyId === user.opptyId) {
            //             return(userId);
            //         }
            //     }        
            // })
            let requiredUserId = 0;
            for(let userIndex in userStats) {
                const user = userStats[userIndex];
                const userId = user.userId;
                if('opptyId' in user) {
                    if(opptyId === user.opptyId) {
                        requiredUserId = userId;
                        break;
                    }
                }
            }
            // console.log('yayayaay userId found!:' + requiredUserId);
            // const userData = users.map((user,index) => {
            //     const userId = user.id;
            //     if( userId === requiredUserId){
            //         noOfDeals ++;
            //         return(user);
            //     }
            // })
            tableData.forEach((user) => {
                if (requiredUserId === user.id){
                    user.noOfDeals ++;
                    user.dealValue += oppty.amount;
                }
            })
        });
        setRecords(tableData);
        console.log(tableData);
    }
    return (
        <div>
            <table id='table'>
                <tr>
                    <th>Team Member</th>
                    <th>Total Deals</th>
                    <th>Deal Value</th>
                    <th>Customer Sentiment</th>
                    <th>Customer Engagement</th>
                    <th>MEDDIC</th>
                    <th>Seller EQ</th>
                </tr>
                {records.map((list, index) => {
                return (
                <tr key={index}>   
                    <td id="userName">
                        {list.teamMember}
                    </td>
                    <td id='TotalDeals'>
                        {list.noOfDeals}
                    </td>
                    <td id='DealValue'>
                        {list.dealValue}
                    </td>
                </tr>)
                })}
            </table>
        </div>

  )
}

export default Teams;