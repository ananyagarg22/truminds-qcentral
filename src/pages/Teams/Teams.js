import './Teams.css';
import React,{ useState, useEffect } from 'react';
import { teamsData } from './teamsData.js';

function Teams() {

    const [records,setRecords] = useState([])
    const [dummyApiData, setDummyApiData] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setDummyApiData(data))
        .catch(err => console.log(err))
    },[])

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
                'customerSentiment': user.customerSentiment,
                'customerEngagement': user.customerEngagement,
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
            <h3 id="table_heading">Using data fetched in real time from a Dummy API</h3>
            <table id='table1'>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Zipcode</th>
                    <th>Company Name</th>
                </tr>
                {dummyApiData.map((list, index) => {
                return (
                <tr key={index}>   
                    <td id="userName">
                        {list.name}
                    </td>
                    <td id='userEmail'>
                        {list.email}
                    </td>
                    <td id='userPhone'>
                        {list.phone}
                    </td>
                    <td id='userCity'>
                        {list.address.city}
                    </td>
                    <td id='userZipCode'>
                        {list.address.zipcode}
                    </td>
                    <td id='userCompany'>
                        {list.company.name}
                    </td>
                </tr>)
                })}
            </table>
            <br></br>
            <h3 id="table_heading">Using hard coded data from the actual website:</h3> 
            <br></br>
            <table id='table2'>
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
                    <td id='userSentiment'>
                        {list.customerSentiment}
                    </td>
                    <td id='userEngagement'>
                        {list.customerEngagement}
                    </td>
                </tr>)
                })}
            </table>
        </div>

  )
}

export default Teams;