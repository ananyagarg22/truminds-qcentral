import './Home.css';

import {Link} from 'react-router-dom';

import {ActionItemSection} from '../../components/ActionItemSection/ActionsItemSection.js';
import { LearningProgress } from '../../components/learningProgress/LearningProgress';
import { EQ } from '../../components/eq/EQ';
import { Dealstatus } from '../../components/dealstatus/Dealstatus';
import { QScore } from '../../components/qscore/QScore';
import { UpcomingMeetings } from '../../components/upcomingmeetings/UpcomingMeetings';

function Home() {
  return (
    <div className="Home">
      <QScore/>
      <EQ/>
      <p id="create-playlist-button">
        <Link 
          to="/playlist" 
          style={{textDecoration: 'none', color: 'white'}}
        > 
          Go to Create Playlist Page
        </Link>
      </p>
      <Dealstatus/>
      <UpcomingMeetings/>
      <LearningProgress/>
      <div id='actionitems'><ActionItemSection/></div>
    </div>
  );
}

export default Home;