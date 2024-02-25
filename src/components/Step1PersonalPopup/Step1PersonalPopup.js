import React from 'react'
import close from '../../assets/close.png';
import './Step1PersonalPopup.css';

function Step1PersonalPopup(props) {

    return(props.trigger?
    <div id="popup">
        <div id="personal-playlist-form">
            <div id='form-header'>
                <b>Personal Playlist</b>
                <img src={close} alt='close' onClick={() => {
                    props.setTrigger(false);
                }}></img>
            </div>
            <div id='form'>
                Location of Form
            </div>
        </div>
    </div>
    : " ")
}

export default Step1PersonalPopup