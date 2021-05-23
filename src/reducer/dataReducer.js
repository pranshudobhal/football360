import { v4 as uuidv4 } from 'uuid';
import { data } from '../data';

export const initialState = {
  videos: data,
  watchLater: [],
  likedVideos: [],
  history: [],
  playlists: [
    {
      id: uuidv4(),
      name: 'Miscellaneous',
      videos: ['KriBQVhsgZk', 'cqylLiMzk54'],
    },
    {
      id: uuidv4(),
      name: 'Top 10',
      videos: ['1B_7JxGsK7Y'],
    },
  ],
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_WATCH_LATER':
      return { ...state, watchLater: state.watchLater.find((video) => video.id === action.payload.id) ? state.watchLater.filter((watchLaterVideo) => action.payload.id !== watchLaterVideo.id) : [...state.watchLater, { ...action.payload }] };

    case 'TOGGLE_LIKED_VIDEO':
      return { ...state, likedVideos: state.likedVideos.find((video) => video.id === action.payload.id) ? state.likedVideos.filter((video) => video.id !== action.payload.id) : [...state.likedVideos, { ...action.payload }] };

    case 'ADD_VIDEO_TO_WATCH_HISTORY':
      return { ...state, history: state.history.find((video) => video.id === action.payload.id) ? [...state.history.filter((video) => video.id !== action.payload.id), { ...action.payload }] : [...state.history, { ...action.payload }] };

    case 'CLEAR_WATCH_HISTORY':
      return { ...state, history: [] };

    case 'CREATE_PLAYLIST':
      return {
        ...state,
        playlists: [
          ...state.playlists,
          {
            id: uuidv4(),
            name: action.payload.playlistName,
            videos: [action.payload.id],
          },
        ],
      };

    case 'TOGGLE_VIDEO_IN_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map((playlistItem) => {
          if (playlistItem.id === action.payload.playlistID) {
            return { ...playlistItem, videos: playlistItem.videos.find((id) => id === action.payload.videoID) ? playlistItem.videos.filter((id) => id !== action.payload.videoID) : [...playlistItem.videos, action.payload.videoID] };
          } else {
            return { ...playlistItem };
          }
        }),
      };

    case 'DELETE_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.filter((playlistItem) => playlistItem.id !== action.payload.id),
      };

    case 'UPDATE_PLAYLIST_NAME':
      return {
        ...state,
        playlists: state.playlists.map((playlistItem) => (playlistItem.id === action.payload.id ? { ...playlistItem, name: action.payload.name } : playlistItem)),
      };

    default:
      throw new Error('Error in Data Reducer');
  }
};
