export const playlistsReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_PLAYLIST':
      return [...action.payload];

    case 'CREATE_PLAYLIST':
      return [
        ...state,
        {
          _id: action.payload._id,
          name: action.payload.playlistName,
          videos: [action.payload.video],
        },
      ];

    case 'TOGGLE_VIDEO_IN_PLAYLIST':
      return [
        ...state.map((playlistItem) => {
          if (playlistItem._id === action.payload.playlistID) {
            return {
              ...playlistItem,
              videos: playlistItem.videos.find((video) => video._id === action.payload.video._id) ? playlistItem.videos.filter((video) => video._id !== action.payload.video._id) : [...playlistItem.videos, action.payload.video],
            };
          } else {
            return { ...playlistItem };
          }
        }),
      ];

    case 'DELETE_PLAYLIST':
      return [...state?.filter((playlistItem) => playlistItem._id !== action.payload)];

    case 'UPDATE_PLAYLIST_NAME':
      return [...state?.map((playlistItem) => (playlistItem._id === action.payload.playlistID ? { ...playlistItem, name: action.payload.name } : playlistItem))];

    case 'RESET_PLAYLIST':
      return null;

    default:
      return state;
  }
};
