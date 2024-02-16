import { useState } from 'react';
import './EQ.css';
import {overallEQ} from './Eqdata.js';

function TeamEQ () {
    return (
        <div>
            <div id="metric">
                <div>EQ Summary</div>
                
            </div>
            <div id="metric">
                <div>Empathy</div>
                <div>{overallEQ['overAll'][0]['empathy']}</div>
            </div>
            <div id="metric">
                <div>Politeness</div>
                <div>{overallEQ['overAll'][0]['politeness']}</div>
            </div>
            <div id="metric">
                <div>Talk Ratio</div>
                <div>{overallEQ['overAll'][0]['talkRatio']}</div>
            </div>
            <div id="metric">
                <div>Talk Speed</div>
                <div>{overallEQ['overAll'][0]['talkSpeed']}</div>
            </div>
            <div id="metric">
                <div>Hesitation</div>
                <div>{overallEQ['overAll'][0]['hesitation']}</div>
            </div>
        </div>
    )
}
function YourEQ () {
    return(
        <div>
            <div id="metric">
                <div>EQ Summary</div>
                
            </div>
            <div id="metric">
                <div>Empathy</div>
                <div>{overallEQ['overAll'][0]['usersStats'][0]['empathy']}</div>
            </div>
            <div id="metric">
                <div>Politeness</div>
                <div>{overallEQ['overAll'][0]['usersStats'][0]['politeness']}</div>
            </div>
            <div id="metric">
                <div>Talk Ratio</div>
                <div>{overallEQ['overAll'][0]['usersStats'][0]['talkRatio']}</div>
            </div>
            <div id="metric">
                <div>Talk Speed</div>
                <div>{overallEQ['overAll'][0]['usersStats'][0]['talkSpeed']}</div>
            </div>
            <div id="metric">
                <div>Hesitation</div>
                <div>{overallEQ['overAll'][0]['usersStats'][0]['hesitation']}</div>
            </div>
        </div>
    )
}

export function EQ (){

    const[currentpage,setcurrentpage] = useState(2);

    return(
    <div id="EQ">
        <div id='allbuttons'>
            {currentpage===1?
                <button id='active-button' onClick={() => setcurrentpage(1)}>Your EQ</button>:
                <button id='button' onClick={() => setcurrentpage(1)}>Your EQ</button>
            }
            {currentpage===2?
                <button id='active-button' onClick={() => setcurrentpage(2)}>Team EQ</button>:
                <button id='button' onClick={() => setcurrentpage(2)}>Team EQ</button>
            }
        </div>
        <div id='contentEQ'>
            {currentpage === 1 ? <YourEQ/>:<TeamEQ/>}

        </div>

    </div>
    )
    
}