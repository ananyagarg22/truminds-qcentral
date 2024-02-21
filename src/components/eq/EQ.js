import { useState } from 'react';
import './EQ.css';
import {overallEQ} from './Eqdata.js';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function TeamEQ () {
    return (
        <div>
            <div id="metric">
                <div>EQ Summary</div>
                
                
            </div>
            <div id="metric">
                <div id='metric_label'>
                    <div>Empathy</div>
                    <div>{overallEQ['overAll'][0]['empathy']}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['empathy']*100}
                        min={0} max={100}   
                    />
                    {/* <Range /> */}
                </div>
            </div>
            <div id="metric">
                <div id='metric_label'>
                    <div>Politeness</div>
                    <div>{overallEQ['overAll'][0]['politeness']}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['usersStats'][0]['empathy']*100}
                        min={0} max={100}   
                    />
                    {/* <Range /> */}
                </div>
            </div>
            <div id="metric">
                <div id='metric_label'>
                    <div>Talk Ratio</div>
                    <div>{overallEQ['overAll'][0]['talkRatio']}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['talkRatio']*100}
                        min={0} max={100}   
                    />
                    {/* <Range /> */}
                </div>
            </div>
            <div id="metric">
                <div id='metric_label'>
                    <div>Talk Speed</div>
                    <div>{overallEQ['overAll'][0]['speakingRate']}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['speakingRate']*100}
                        min={0} max={100}
                    />
                    {/* <Range /> */}
                </div>
            </div>
            <div id="metric">
                <div id='metric_label'>
                    <div>Hesitation</div>
                    <div>{overallEQ['overAll'][0]['hesitation']}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['hesitation']*100}
                        min={0} max={100}   
                    />
                    {/* <Range /> */}
                </div>
            </div>
        </div>
    )
}
function YourEQ () {
    return(
        <div>
            <div id="metric">
                <div id='metric_label'>
                    <div>Empathy</div>
                    <div>{overallEQ['overAll'][0]['usersStats'][0]['empathy']}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['usersStats'][0]['empathy']*100}
                        min={0} max={100}   
                    />
                    {/* <Range /> */}
                </div>
            </div>
            <div id="metric">
                <div id='metric_label'>
                    <div>Politeness</div>
                    <div>{overallEQ['overAll'][0]['usersStats'][0]['politeness']}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['usersStats'][0]['politeness']*100}
                        min={0} max={100}   
                    />
                    {/* <Range /> */}
                </div>
            </div>
            <div id="metric">
                <div id='metric_label'>
                    <div>Talk Ratio</div>
                    <div>{overallEQ['overAll'][0]['usersStats'][0]['talkRatio']}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['usersStats'][0]['talkRatio']*100}
                        min={0} max={100}   
                    />
                    {/* <Range /> */}
                </div>
            </div>
            <div id="metric">
                <div id='metric_label'>
                    <div>Talk Speed</div>
                    <div>{overallEQ['overAll'][0]['usersStats'][0]['speakingRate']}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['usersStats'][0]['speakingRate']*100}
                        min={0} max={100}
                    />
                    {/* <Range /> */}
                </div>
            </div>
            <div id="metric">
                <div id='metric_label'>
                    <div>Hesitation</div>
                    <div>{overallEQ['overAll'][0]['usersStats'][0]['hesitation']}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['usersStats'][0]['hesitation']*100}
                        min={0} max={100}   
                    />
                    {/* <Range /> */}
                </div>
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