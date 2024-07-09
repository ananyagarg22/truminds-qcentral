import plus from '../../assets/plus.png';
import './Playlist.css';
import {Popup} from '../../components/Popup/Popup.js';
import { useState } from 'react';
import { Navbar } from '../../components/navbar/Navbar.js';

function Playlist() {
    
    const [trigger, setTrigger] = useState(false); 

    return (
        <div id='navbar-playlist'>
            <Navbar/>
            <div id='createplaylistbutton'>
                <button id="playlist-popup-button" onClick={() => setTrigger(true)}><img src={plus} alt='add' height={20} width={20}></img>Create Playlist</button>
                <Popup trigger={trigger} setTrigger={setTrigger}/>
            </div>
        </div>
    );
}

export default Playlist;