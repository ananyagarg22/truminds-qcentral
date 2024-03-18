import { useState } from 'react';
import './Popup.css';
import React from 'react';
import close from '../../assets/close.png';
import {Step1} from '../Step1/Step1.js';
import {Step2} from '../Step2/Step2.js';
import {Step3} from '../Step3/Step3.js';

export function Popup (props){

    const [currentpage,setcurrentpage] = useState(1);
    const [medicSelected, setMedicSelected] = useState({});
    const [customSelected, setCustomSelected] = useState({});

    return(props.trigger?
    <div id="popup">
        <div id="popup_items">
            <div id='popupHeader'>
                <b>Create Playlist</b>
                <img src={close} alt='close' onClick={() => {
                    props.setTrigger(false);
                    setcurrentpage(1);
                    setMedicSelected({});
                    setCustomSelected({});
                }}></img>
            </div>
            <div id='allsteps'>
                {currentpage===1?
                    <button id='active-step' onClick={() => setcurrentpage(1)}>1. Playlist type</button>:
                    currentpage>1?
                        <button id='completed-step' onClick={() => setcurrentpage(1)} disabled>1. Playlist type</button>:""
                }
                {currentpage===2?
                    <button id='active-step' onClick={() => setcurrentpage(2)}>2. Playlist parameters</button>:
                    currentpage>2?
                        <button id='completed-step' onClick={() => setcurrentpage(2)} disabled>2. Playlist parameters</button>:
                        <button onClick={() => setcurrentpage(2)} disabled>2. Playlist parameters</button>
                }
                {currentpage===3?
                    <button id='active-step' onClick={() => setcurrentpage(3)}>3. Review playlist configurations</button>:
                    <button onClick={() => setcurrentpage(3)} disabled>3. Review playlist configurations</button>
                }
            </div>
            <hr></hr>
            <div id='popupContent'>
                {
                currentpage === 1 ? 
                    <Step1 setPage={setcurrentpage}/> :
                    currentpage === 2 ? 
                        <Step2 setPage={setcurrentpage} medic={medicSelected} custom={customSelected} setMedic={setMedicSelected} setCustom={setCustomSelected}/> :
                        <Step3 setPage={setcurrentpage} medic={medicSelected} custom={customSelected}/>
                }
            </div>
        </div>
    </div>
    : " ")
    
}