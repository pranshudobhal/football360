import { VideoListing, Login, SignUp, VideoPage, Trending, History, PlaylistListing, PlaylistPage, WatchLater, LikedVideos, Library, Error404 } from './pages';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<VideoListing />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:videoID" element={<VideoPage />} />
        <PrivateRoute path="/history" element={<History />} />
        <PrivateRoute path="/playlist" element={<PlaylistListing />} />
        <PrivateRoute path="/playlist/:playlistID" element={<PlaylistPage />} />
        <PrivateRoute path="/watchlater" element={<WatchLater />} />
        <PrivateRoute path="/library" element={<Library />} />
        <PrivateRoute path="/likedvideos" element={<LikedVideos />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
