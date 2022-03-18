export const videosReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_VIDEOS':
      return [...action.payload];

    default:
      return state;
  }
};
