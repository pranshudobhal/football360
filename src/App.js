import './App.css';

import { VideoListing, VideoPage, History, Playlist, WatchLater, LikedVideos, Error404 } from './pages';
import { HeaderMobile, NavbarMobile } from './components';

import { Routes, Route, NavLink } from 'react-router-dom';

function App() {
  return (
    <>
      <HeaderMobile />
      <nav>
        {/* <NavLink end to="/">
          <button>Home</button>
        </NavLink>
        &nbsp; */}
        <NavLink to="/history">
          <button>History</button>
        </NavLink>
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

      <NavbarMobile />
      <Routes>
        {/* <Route path="/" element={<VideoListing />} /> */}
        {/* <Route path="/trending" element={<VideoListing />} /> */}
        <Route path="/:videoID" element={<VideoPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/likedvideos" element={<LikedVideos />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
