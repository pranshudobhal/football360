import { createContext, useContext, useReducer } from 'react';
import { data } from './data';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    videos: data,
    watchLater: [],
    likedVideos: [],
    history: [],
    playlist: [
      {
        id: 1,
        name: 'playlist 1',
        videos: ['KriBQVhsgZk', 'cqylLiMzk54'],
      },
      {
        id: 2,
        name: 'playlist 2',
        videos: ['1B_7JxGsK7Y'],
      },
    ],
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
        playlist: state.playlist,
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

    case 'CREATE_PLAYLIST':
      return {
        ...state,
        playlist: [
          ...state.playlist,
          {
            id: 4,
            name: action.payload.playlistName,
            videos: [action.payload.id],
          },
        ],
      };

    case 'ADD_TO_PLAYLIST':
      return {
        ...state,
        playlist: state.playlist.map((playlistItem) => {
          if (playlistItem.id === action.payload.playlistID) {
            return { ...playlistItem, videos: playlistItem.videos.find((id) => id === action.payload.videoID) ? [...playlistItem.videos] : [...playlistItem.videos, action.payload.videoID] };
          } else {
            return { ...playlistItem };
          }
        }),
      };

    case 'DELETE_PLAYLIST':
      return {
        ...state,
        playlist: state.playlist.filter((playlistItem) => playlistItem.id !== action.payload.id),
      };

    case 'REMOVE_VIDEO_FROM_PLAYLIST':
      return {
        ...state,
        playlist: state.playlist.map((playlistItem) => {
          if (playlistItem.id === action.payload.playlistID) {
            return { ...playlistItem, videos: playlistItem.videos.filter((id) => id !== action.payload.videoID) };
          } else {
            return playlistItem;
          }
        }),
      };

    case 'UPDATE_PLAYLIST_NAME':
      return {
        ...state,
        playlist: state.playlist.map((playlistItem) => (playlistItem.id === action.payload.id ? { ...playlistItem, name: action.payload.name } : playlistItem)),
      };

    default:
      throw new Error('error in reducer');
  }
};
