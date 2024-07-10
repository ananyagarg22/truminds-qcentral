import './Navbar.css';
import libraryIcon from '../../assets/library-image.png';
import adminIcon from '../../assets/admin-image.png';
import analyticsIcon from '../../assets/analytics-image.png';
import dealsIcon from '../../assets/deals-image.png';
import homeIcon from '../../assets/home-icon-image.png';
import improveIcon from '../../assets/improve-image.png';
import meetingIcon from '../../assets/meetings-image.png';
import teamsIcon from '../../assets/teams-image.png';

import {Link} from 'react-router-dom';


export function Navbar (){
    return(
        <div id='navbar'>
        {/* Home button */}
        <p id="home-button">
          <Link 
            to="/" 
            style={{textDecoration: 'none', color: 'white'}}
          > 
            <img src={homeIcon} alt='home'></img>
          </Link>
        </p>
        {/* Meetings */}
        {/* <p id='meeting-button'><img src={meetingIcon} alt='meeting'></img></p> */}
        {/* Go to Deals Button */}
        <p id="deals-button">
          <Link 
            to="/deals" 
            style={{textDecoration: 'none', color: 'white'}}
          > 
            <img src={dealsIcon} alt='deals'></img>
          </Link>
        </p>
        {/* Teams Button */}
        <p id="teams-button">
          <Link 
            to="/teams" 
            style={{textDecoration: 'none', color: 'white'}}
          > 
            <img src={teamsIcon} alt='teams'></img>
          </Link>
        </p>
        {/* improve button */}
        {/* <p id='improve-button'><img src={improveIcon} alt='improve'></img></p> */}
        {/* analytics button */}
        {/* <p id='analytics-button'><img src={analyticsIcon} alt='analytics'></img></p>   */}
        {/* Create Playlist button */}
        <p id="create-playlist-button">
          <Link 
            to="/playlist" 
            style={{textDecoration: 'none', color: 'white'}}
          > 
            <img src={libraryIcon} alt='playlist'></img>
          </Link>
        </p>
        {/* Admin Button */}
        <p id="admin-button">
          <Link 
            to="/admin" 
            style={{textDecoration: 'none', color: 'white'}}
          > 
            <img src={adminIcon} alt='admin'></img>
          </Link>
        </p>

      </div>

    )
}


