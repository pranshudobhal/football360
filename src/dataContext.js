import { createContext, useContext, useReducer } from 'react';
import { data } from './data';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    videos: data,
    watchLater: [],
    likedVideos: [],
    history: [],
  });

  function toggleLikeButtonText(id) {
    if (state.likedVideos.find((video) => video.id === id)) {
      return 'Unlike';
    } else {
      return 'Like';
    }
  }

  function toggleWatchLaterText(id) {
    if (state.watchLater.find((video) => video.id === id)) {
      return 'Remove from watch later';
    } else {
      return 'Add to watch later';
    }
  }

  return (
    <DataContext.Provider
      value={{
        videos: state.videos,
        videoDispatch: dispatch,
        watchLater: state.watchLater,
        likedVideos: state.likedVideos,
        history: state.history,
        toggleLikeButtonText,
        toggleWatchLaterText,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_WATCH_LATER':
      return { ...state, watchLater: state.watchLater.find((video) => video.id === action.payload.id) ? state.watchLater.filter((watchLaterVideo) => action.payload.id !== watchLaterVideo.id) : [...state.watchLater, { ...action.payload }] };

    case 'TOGGLE_LIKED_VIDEO':
      return { ...state, likedVideos: state.likedVideos.find((video) => video.id === action.payload.id) ? state.likedVideos.filter((video) => video.id !== action.payload.id) : [...state.likedVideos, { ...action.payload }] };

    case 'ADD_VIDEO_TO_HISTORY':
      return { ...state, history: state.history.find((video) => video.id === action.payload.id) ? [...state.history.filter((video) => video.id !== action.payload.id), { ...action.payload }] : [...state.history, { ...action.payload }] };

    default:
      throw new Error('error in reducer');
  }
};
