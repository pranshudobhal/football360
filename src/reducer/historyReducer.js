export const historyReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_HISTORY':
      return [...action.payload];

    case 'ADD_VIDEO_TO_WATCH_HISTORY':
      return [...(state?.find((video) => video._id === action.payload._id) ? [...state.filter((video) => video._id !== action.payload._id), { ...action.payload }] : [...state, { ...action.payload }])];

    case 'CLEAR_WATCH_HISTORY':
      return [];

    default:
      return state;
  }
};
