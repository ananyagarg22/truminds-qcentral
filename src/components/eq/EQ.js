import { useState } from 'react';
import './EQ.css';
import {overallEQ} from './Eqdata.js';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function Metric(props) {
    return (
        <div id="metric">
                <div id='metric_label'>
                    <div>{props.label}</div>
                    <div>{Math.round(props.value*100)/100}</div>
                </div>
                <div>
                    <Slider 
                        value={props.value*100}
                        min={props.min} max={props.max}   
                    />
                    {/* <Range /> */}
                </div>
            </div>
    );
}

function TeamEQ () {
    return (
        <div>
            <div id="metric">
                <div>EQ Summary</div>
                
                
            </div>
            <Metric 
                label = "Empathy"
                value = {overallEQ['overAll'][0]['empathy']}
                min = {0}
                max = {100}
            />
            {/* <div id="metric">
                <div id='metric_label'>
                    <div>Empathy</div>
                    <div>{Math.round(overallEQ['overAll'][0]['empathy']*100)/100}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['empathy']*100}
                        min={0} max={100}   
                    />
                </div>
            </div> */}
            <Metric
                label = "Politeness"
                value = {overallEQ['overAll'][0]['politeness']}
                min = {0}
                max = {100}
            />
            {/* <div id="metric">
                <div id='metric_label'>
                    <div>Politeness</div>
                    <div>{Math.round(overallEQ['overAll'][0]['politeness']*100)/100}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['usersStats'][0]['politeness']*100}
                        min={0} max={100}   
                    />
                </div>
            </div> */}
            <Metric
                label = "Talk Ratio"
                value = {overallEQ['overAll'][0]['talkRatio']}
                min = {0}
                max = {100}
            />
            {/* <div id="metric">
                <div id='metric_label'>
                    <div>Talk Ratio</div>
                    <div>{Math.round(overallEQ['overAll'][0]['talkRatio']*100)/100}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['talkRatio']*100}
                        min={0} max={100}   
                    />
                </div>
            </div> */}
            <Metric
                label = "Talk Speed"
                value = {overallEQ['overAll'][0]['speakingRate']}
                min = {0}
                max = {100}
            />
            {/* <div id="metric">
                <div id='metric_label'>
                    <div>Talk Speed</div>
                    <div>{Math.round(overallEQ['overAll'][0]['speakingRate']*100)/100}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['speakingRate']*100}
                        min={0} max={100}
                    />
                </div>
            </div> */}
            <Metric
                label = "Hesitation"
                value = {overallEQ['overAll'][0]['hesitation']}
                min = {0}
                max = {100}
            />
            {/* <div id="metric">
                <div id='metric_label'>
                    <div>Hesitation</div>
                    <div>{Math.round(overallEQ['overAll'][0]['hesitation']*100)/100}</div>
                </div>
                <div>
                    <Slider 
                        value={overallEQ['overAll'][0]['hesitation']*100}
                        min={0} max={100}   
                    />
                </div>
            </div> */}
        </div>
    )
}
function YourEQ () {
    return(
        <div>
            <div id="metric">
                <div id='metric_label'>
                    <div>Empathy</div>
                    <div>{Math.round(overallEQ['overAll'][0]['usersStats'][0]['empathy']*100)/100}</div>
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
                    <div>{Math.round(overallEQ['overAll'][0]['usersStats'][0]['politeness']*100)/100}</div>
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
                    <div>{Math.round(overallEQ['overAll'][0]['usersStats'][0]['talkRatio']*100)/100}</div>
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
                    <div>{Math.round(overallEQ['overAll'][0]['usersStats'][0]['speakingRate']*100)/100}</div>
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
                    <div>{Math.round(overallEQ['overAll'][0]['usersStats'][0]['hesitation']*100)/100}</div>
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