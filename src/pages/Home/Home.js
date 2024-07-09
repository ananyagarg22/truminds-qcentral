import './Home.css';

import {Navbar} from '../../components/navbar/Navbar.js';
import {ActionItemSection} from '../../components/ActionItemSection/ActionsItemSection.js';
import { LearningProgress } from '../../components/learningProgress/LearningProgress';
import { EQ } from '../../components/eq/EQ';
import { Dealstatus } from '../../components/dealstatus/Dealstatus';
import { QScore } from '../../components/qscore/QScore';
import { UpcomingMeetings } from '../../components/upcomingmeetings/UpcomingMeetings';

function Home() {
  return (

    <div id='homepage'>

      <Navbar/>
      <div className="Home">
        <QScore/>
        <EQ/>
        <Dealstatus/>
        <UpcomingMeetings/>
        <LearningProgress/>
        <div id='actionitems'><ActionItemSection/></div>
      </div>
    </div>  
  );
}
export default Home;