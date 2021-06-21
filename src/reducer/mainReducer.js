import { historyReducer } from './historyReducer';
import { likedVideosReducer } from './likedVideosReducer';
import { playlistsReducer } from './playlistsReducer';
import { videosReducer } from './videosReducer';
import { watchLaterReducer } from './watchLaterReducer';

export const initialState = {
  videos: null,
  watchLater: null,
  likedVideos: null,
  history: null,
  playlists: null,
};

export const mainReducer = ({ videos, watchLater, likedVideos, history, playlists }, action) => ({
  videos: videosReducer(videos, action),
  watchLater: watchLaterReducer(watchLater, action),
  likedVideos: likedVideosReducer(likedVideos, action),
  history: historyReducer(history, action),
  playlists: playlistsReducer(playlists, action),
});
