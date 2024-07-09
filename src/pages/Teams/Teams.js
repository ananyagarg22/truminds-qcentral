import './Teams.css';
import React,{ useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { teamsData } from './teamsData.js';
import { Navbar } from '../../components/navbar/Navbar.js';


// function dummyDataReducer (state, action) {
//     if (action.type === 'UPDATE') {
//         return action.payload;
//     }

//     if (action.type === 'DELETE') {
//         return [];
//     }
// }

function Teams() {

    // const [records,setRecords] = useState([])
    const [dummyApiData, setDummyApiData] = useState([])

    const dummyData = useSelector(state => state.table2Data);
    const dispatch = useDispatch();

    // const [dummyDataState, dummyDataDispatch] = useReducer(dummyDataReducer, []);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setDummyApiData(data))
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
        const tableData = teamsDataCalculation();
        updateTableData(tableData);
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
        activeOppties.forEach((oppty) => {
            const opptyId = oppty.id;
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
            tableData.forEach((user) => {
                if (requiredUserId === user.id){
                    user.noOfDeals ++;
                    user.dealValue += oppty.amount;
                }
            })
        });
        // setRecords(tableData);
        return tableData;
    }

    function updateTableData(tableData) {
        // dummyDataDispatch({
        //     type: 'UPDATE_TABLE2',
        //     payload: tableData
        // });
        console.log("Dispatching the action to update the Table 2");
        dispatch({
            type: 'UPDATE_TABLE2',
            payload: tableData
        });
    }

    function deleteTableData() {
        // dummyDataDispatch({
        //     type: 'DELETE_TABLE2'
        // });
        console.log("Dispatching the action to delete the data of Table 2");
        dispatch({
            type: 'DELETE_TABLE2'
        });
    }

    function repopulateData() {
        const tableData = teamsDataCalculation();
        updateTableData(tableData);
    }

    return (
        <div id='navbar-teams'>
            <Navbar/>
            <div id='restofthecontent'>
                <div id="table1">
                    <h3 id="table_heading">Using data fetched in real time from a Dummy API</h3>
                    <table>
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
                </div>
                <br></br>
                <div id="table2">
                    <h3 id="table_heading">Using hard coded data from the actual website:</h3> 
                    <div style={{display: 'flex', justifyContent: 'space-evenly', paddingBottom: '1%'}}>
                        <button onClick={repopulateData}>REPOPULATE THE TABLE</button>
                        <button onClick={deleteTableData}>DELETE THE CONTENTS</button>
                    </div>
                    <table>
                        <tr>
                            <th>Team Member</th>
                            <th>Total Deals</th>
                            <th>Deal Value</th>
                            <th>Customer Sentiment</th>
                            <th>Customer Engagement</th>
                            <th>MEDDIC</th>
                            <th>Seller EQ</th>
                        </tr>
                        {dummyData.map((list, index) => {
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
            </div>
    </div>

  )
}

export default Teams;