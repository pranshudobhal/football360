import './App.css';
import { VideoListing } from './VideoListing';
import { VideoPage } from './VideoPage';
import { History } from './History';
import { Playlist } from './Playlist';
import { Watchlater } from './Watchlater';
import { Likedvideos } from './Likedvideos';
import { NoMatch } from './error404';

import { Routes, Route, NavLink } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <NavLink end to="/">
          <button>Home</button>
        </NavLink>{' '}
        &nbsp;
        <NavLink to="/history">
          <button>History</button>
        </NavLink>{' '}
        &nbsp;
        <NavLink to="/playlist">
          <button>Playlist</button>
        </NavLink>
        &nbsp;
        <NavLink to="/watchlater">
          <button>Watch Later</button>
        </NavLink>
        &nbsp;
        <NavLink to="/likedvideos">
          <button>Liked Videos</button>
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<VideoListing />} />
        <Route path="/:videoID" element={<VideoPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/watchlater" element={<Watchlater />} />
        <Route path="/likedvideos" element={<Likedvideos />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
