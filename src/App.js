import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home/Home.js';
import Playlist from './pages/Playlist/Playlist.js';
import Deals from './pages/Deals/Deals.js';

const routes = createBrowserRouter([
  { path:'/', element: <Home/> },
  { path:'/playlist', element: <Playlist/> },
  { path:'/deals', element: <Deals/>},
]);

function App() {
  return (<RouterProvider router={routes}/>);
}

export default App;
