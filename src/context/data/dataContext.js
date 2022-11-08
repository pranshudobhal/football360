import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { mainReducer, initialState } from '../../reducer/mainReducer';
import { API_URL } from '../../utils';
import { useAuth } from '../auth/authContext';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const { token } = useAuth();

  useEffect(() => {
    (async function fetchDataFromServer() {
      try {
        const videosResponse = await axios.get(`${API_URL}/videos`);

        dispatch({ type: 'INITIALIZE_VIDEOS', payload: videosResponse.data.allVideos });

        if (token) {
          const likedVideosResponse = await axios.get(`${API_URL}/likedvideo`);
          const watchLaterResponse = await axios.get(`${API_URL}/watchlater`);
          const playlistResponse = await axios.get(`${API_URL}/playlist`);
          const historyResponse = await axios.get(`${API_URL}/history`);

          dispatch({ type: 'INITIALIZE_LIKED_VIDEOS', payload: likedVideosResponse.data.allLikedVideos.videos });
          dispatch({ type: 'INITIALIZE_WATCH_LATER', payload: watchLaterResponse.data.allWatchLater.videos });
          dispatch({ type: 'INITIALIZE_PLAYLIST', payload: playlistResponse.data.allPlaylists.playlists });
          dispatch({ type: 'INITIALIZE_WATCH_HISTORY', payload: historyResponse.data.allHistory.videos });
        } else {
          dispatch({ type: 'RESET_LIKED_VIDEOS' });
          dispatch({ type: 'RESET_WATCH_LATER' });
          dispatch({ type: 'RESET_PLAYLIST' });
          dispatch({ type: 'RESET_WATCH_HISTORY' });
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
