export const watchLaterReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_WATCH_LATER':
      return [...action.payload];

    case 'TOGGLE_WATCH_LATER':
      return [...(state?.find((video) => video._id === action.payload._id) ? state.filter((watchLaterVideo) => action.payload._id !== watchLaterVideo._id) : [...state, { ...action.payload }])];

    case 'RESET_WATCH_LATER':
      return null;

    default:
      return state;
  }
};
