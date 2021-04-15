import './App.css';

import { VideoListing, VideoPage, Trending, History, Playlist, WatchLater, LikedVideos, Library, Error404 } from './pages';
import { HeaderMobile, NavbarMobile } from './components';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <HeaderMobile />
      <NavbarMobile />
      <Routes>
        <Route path="/" element={<VideoListing />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/:videoID" element={<VideoPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/library" element={<Library />} />
        <Route path="/likedvideos" element={<LikedVideos />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
