import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home/Home.js';
import Playlist from './pages/Playlist/Playlist.js';
import Deals from './pages/Deals/Deals.js';
import Teams from './pages/Teams/Teams.js';
import Admin from './pages/Admin/Admin.js';

const routes = createBrowserRouter([
  { path:'/', element: <Home/> },
  { path:'/playlist', element: <Playlist/> },
  { path:'/deals', element: <Deals/>},
  { path:'/teams', element: <Teams/>},
  { path:'/admin', element: <Admin/>}
]);

function App() {
  return (<RouterProvider router={routes}/>);
}

export default App;
