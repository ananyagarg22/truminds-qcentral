import search from '../../assets/search.png';
import up_arrow from '../../assets/up-arrow.png';
import down_arrow from '../../assets/down-arrow.png';
import './ActionsItemSection.css';
import {ACTION_DATA} from './data.js';
import {useState} from 'react';

function ActionItem (props) {
    const [open, setOPen] = useState(props.id === 0 ? true : false);
    const toggle = () => {
        setOPen(!open);
      };
  return (
    <div id='toggle'>
      <button id="collapsible-section" onClick={toggle}>{props.title}<img src={open?up_arrow:down_arrow} alt='arrows' height={15} width={15}></img></button>
      {open && 
      <div id='content'>
        <div id='title'>{props.title}</div>
        <div id='amountandstartdate'>
            <div>{props.amount}</div>
            <div>{Intl.DateTimeFormat('en-US', {
                year:'numeric',
                month:'short',
                day:'numeric',
            }).format(Date.now())}</div>
        </div>
        <div id='description'>{props.children}</div>
      </div>}
    </div>
  );
}

export function ActionItemSection () {
    const[sampleData, setSampleData] = useState(ACTION_DATA);

    function sortByDate (ACTION_DATA) {

        const sortedData = [...ACTION_DATA].sort((a,b) => {
            return Date.parse(a.startdate) > Date.parse(b.startdate) ? -1 : 1 
        })
        console.log(sortedData)
        setSampleData(sortedData)
    }
    function sortByAmount(ACTION_DATA) {

        const sortedData = [...ACTION_DATA].sort((a,b) => {
            return a.amount > b.amount ? -1 : 1 
        })
        setSampleData(sortedData)
    }

    function sortBy(event) {
        if (event.target.value === 'amount'){
            sortByAmount(ACTION_DATA)
        }
        else if (event.target.value === 'recency'){
            sortByDate(ACTION_DATA)
        } 
    }
    
    const[samplesearch,setsamplesearch] = useState("");

    return(
        <div id='action-centre'>
            <div id='header'>
                <h5>Action Items</h5>
                <select name="filter" id="filter" defaultValue='recency' onChange={sortBy}>
                    <option value="amount">Amount</option>
                    <option value="recency">Recency</option>
                </select>
            
            </div>
            <div id='searchbar'>
                <img src = {search} alt='Search' height={15} width={15}></img>
                <input name='search' type='text' placeholder="Search action items" onChange={(event) => setsamplesearch(event.target.value)}></input>
            </div>
            {/* for i 1 to 10{
                collapsible(title,amount,description,startdate)
            } */}
            <ul id='list'>    
                {sampleData.filter((action) => { 
                    return samplesearch.toLowerCase() === '' ? 
                        action: 
                        action.title.toLowerCase().includes(samplesearch)
                }).map((action)=>{
                    return(
                    <ActionItem key={action.title}
                    id={action.id}
                    title={action.title} 
                    amount={action.amount}
                    startdate={action.startdate}>
                        {action.description}
                    </ActionItem>
                )})}
            </ul>
        </div>
    )
 }