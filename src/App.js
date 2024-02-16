import './App.css';
import {ActionItemSection} from './components/ActionItemSection/ActionsItemSection';
import { LearningProgress } from './components/learningProgress/LearningProgress';
import { EQ } from './components/eq/EQ';
import { Dealstatus } from './components/dealstatus/Dealstatus';
import { QScore } from './components/qscore/QScore';
import { UpcomingMeetings } from './components/upcomingmeetings/UpcomingMeetings';

function App() {
  return (
    <div className="App">
      <QScore/>
      <EQ/>
      <Dealstatus/>
      <UpcomingMeetings/>
      <LearningProgress/>
      <div id='actionitems'><ActionItemSection/></div>
      {/* <div id='actionitems'><ActionItemSection/></div>
      <div id='actionitems'><ActionItemSection/></div> */}
      {/* <div id='actionitems'><ActionItemSection/></div> */}
      {/* <div id='actionitems'><ActionItemSection/></div> */}
      {/* <div id='actionitems'><ActionItemSection/></div> */}
    </div>
  );
}

export default App;
