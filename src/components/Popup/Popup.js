import { useState } from 'react';
import './Popup.css';
import React from 'react';
import close from '../../assets/close.png';
import {Step1} from '../Step1/Step1.js';

function Step2 () {
  return (
    <h1> step2 </h1>
  )
}

function Step3 () {
    return (
      <h1> step3 </h1>
    )
}

export function Popup (props){

    const[currentpage,setcurrentpage] = useState(1);

    return(props.trigger?
    <div id="popup">
        <div id="popup_items">
            <div id='popupHeader'>
                <b>Create Playlist</b>
                <img src={close} alt='close' onClick={() => {
                    props.setTrigger(false);
                    setcurrentpage(1);
                }}></img>
            </div>
            <div id='allsteps'>
                {currentpage===1?
                    <button id='active-step' onClick={() => setcurrentpage(1)}>1. Playlist type</button>:
                    currentpage>1?
                        <button id='completed-step' onClick={() => setcurrentpage(1)}>1. Playlist type</button>:""
                }
                {currentpage===2?
                    <button id='active-step' onClick={() => setcurrentpage(2)}>2. Playlist parameters</button>:
                    currentpage>2?
                        <button id='completed-step' onClick={() => setcurrentpage(2)}>2. Playlist parameters</button>:
                        <button onClick={() => setcurrentpage(2)}>2. Playlist parameters</button>
                }
                {currentpage===3?
                    <button id='active-step' onClick={() => setcurrentpage(3)}>3. Review playlist configurations</button>:
                    <button onClick={() => setcurrentpage(3)}>3. Review playlist configurations</button>
                }
            </div>
            <hr></hr>
            <div id='popupContent'>
                {
                currentpage === 1 ? 
                    <Step1/> :
                    currentpage === 2 ? 
                        <Step2/> :
                        <Step3/>
                }
            </div>
        </div>
    </div>
    : " ")
    
}