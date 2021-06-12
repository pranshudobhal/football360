import { VideoListing, Login, VideoPage, Trending, History, PlaylistListing, PlaylistPage, WatchLater, LikedVideos, Library, Error404 } from './pages';
import { Header, Navbar } from './components';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<VideoListing />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:videoID" element={<VideoPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/playlist" element={<PlaylistListing />} />
        <Route path="/playlist/:playlistID" element={<PlaylistPage />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/library" element={<Library />} />
        <Route path="/likedvideos" element={<LikedVideos />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
