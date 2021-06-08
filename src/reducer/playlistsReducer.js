/**
 * TODO:
 * 1. change id assigned
 */
export const playlistsReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_PLAYLIST':
      return [...action.payload];

    case 'CREATE_PLAYLIST':
      return {
        ...state,
        playlists: [
          ...state.playlists,
          {
            id: 1,
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
      return state;
  }
};
