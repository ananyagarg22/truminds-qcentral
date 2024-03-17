import React, { useState } from 'react'
import close from '../../assets/close.png';
import './Step1PersonalPopup.css';

function Step1PersonalPopup(props) {

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    return(props.trigger?
    <div id="popup">
        <div id="personal-playlist-form">
            <div id='form-header'>
                <b>Personal Playlist</b>
                <img src={close} alt='close' onClick={() => {
                    props.setTrigger(false);
                }}></img>
            </div>
            <div id="line"></div>
            <div id='form'>
                <h4>Name</h4>
                <input id="name" type='text' onChange={e => setName(e.target.value)}></input>
                <h4>Description</h4>
                <input id="desc" type='text' onChange={e => setDesc(e.target.value)}></input>
                <div id="buttons">
                    <button id="my-form-button" onClick={() => props.setTrigger(false)}>Cancel</button>
                    <button id={name===""?"disabled-button":"my-form-button"}>Create</button>
                </div>
            </div>
        </div>
    </div>
    : " ")
}

export default Step1PersonalPopup