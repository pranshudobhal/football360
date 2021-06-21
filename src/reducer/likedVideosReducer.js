export const likedVideosReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_LIKED_VIDEOS':
      return [...action.payload];

    case 'TOGGLE_LIKED_VIDEO':
      return [...(state?.find((video) => video._id === action.payload._id) ? state.filter((video) => video._id !== action.payload._id) : [...state, { ...action.payload }])];

    case 'RESET_LIKED_VIDEOS':
      return null;

    default:
      return state;
  }
};
