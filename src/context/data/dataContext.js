import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { mainReducer, initialState } from '../../reducer/mainReducer';
import { useAuth } from '../auth/authContext';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const { token } = useAuth();

  useEffect(() => {
    (async function fetchDataFromServer() {
      try {
        const videosResponse = await axios.get('http://localhost:3000/videos');

        dispatch({ type: 'INITIALIZE_VIDEOS', payload: videosResponse.data.allVideos });

        if (token) {
          const likedVideosResponse = await axios.get(`http://localhost:3000/likedvideo`);
          const watchLaterResponse = await axios.get(`http://localhost:3000/watchlater`);
          const playlistResponse = await axios.get(`http://localhost:3000/playlist`);
          const historyResponse = await axios.get(`http://localhost:3000/history`);

          dispatch({ type: 'INITIALIZE_LIKED_VIDEOS', payload: likedVideosResponse.data.allLikedVideos.videos });
          dispatch({ type: 'INITIALIZE_WATCH_LATER', payload: watchLaterResponse.data.allWatchLater.videos });
          dispatch({ type: 'INITIALIZE_PLAYLIST', payload: playlistResponse.data.allPlaylists.playlists });
          dispatch({ type: 'INITIALIZE_HISTORY', payload: historyResponse.data.allHistory.videos });
        }
      } catch (error) {
        console.error('Error initializing data from backend!!! ' + error);
      }
    })();
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        videos: state.videos,
        videoDispatch: dispatch,
        watchLater: state.watchLater,
        likedVideos: state.likedVideos,
        history: state.history,
        playlists: state.playlists,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
