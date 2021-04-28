import { createContext, useContext, useReducer } from 'react';
import { dataReducer, initialState } from '../reducer/dataReducer';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

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
