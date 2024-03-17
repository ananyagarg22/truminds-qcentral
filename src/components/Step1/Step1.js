import React, { useState } from "react";
import './Step1.css';
import Step1PersonalPopup from "../Step1PersonalPopup/Step1PersonalPopup";

function Personal() {
    const [trigger, setTrigger] = useState(false); 
    return (
        <div id="box">
            <h2>Personal</h2>
            <p>Create a personal playlist that will only be visible to you and the team members that you invite.</p>        
            <p>You will determine the video clips that will go into this playlist.</p>
            <button id="my-step1-button" onClick={
                () => {
                    setTrigger(true);
            }}>Select</button>
            <Step1PersonalPopup trigger={trigger} setTrigger={setTrigger}/>
        </div>
    )
}

function MachineGenerated({selected, setSelected}) {

    function toggleSelected() {
        if(selected === true) {
            setSelected(false);
        } else {
            setSelected(true);
        }
    }

    return (
        <div id={selected===false?"box":"box-selected"}>
            <h2>Machine-Generated</h2>
            <p>Create a machine-generated playlist that will be shared with all team members once published.</p>
            <p>The contents of this playlist will be generated by Q and will be considered a “Q Recommended” playlist.</p>
            <button id="my-step1-button" onClick={toggleSelected}>{selected===false?"Select":"Selected"}</button>
        </div>
    );
}


export function Step1 ({setPage}) {

    const [selected, setSelected] = useState(false);

    return (
        <div id="step1">
            <div id="options">
                <Personal/>
                <MachineGenerated selected={selected} setSelected={setSelected}/>
            </div>
            <button id={selected===true?"my-step1-continue":"disabled-button"} onClick={() => setPage(2)}>Continue</button>
        </div>
    )
  }

  