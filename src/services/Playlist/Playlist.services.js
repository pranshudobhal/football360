import axios from 'axios';
import { API_URL } from '../../utils';

export const deletePlaylist = async (playlistID, navigate, videoDispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/playlist/${playlistID}`);

    if (response.status === 200) {
      navigate('/playlist');
      videoDispatch({ type: 'DELETE_PLAYLIST', payload: playlistID });
    }
  } catch (error) {
    console.error('Error deleting playlist', error);
  }
};

export const updatePlaylistName = async (playlistID, videoDispatch, playlistName) => {
  try {
    const response = await axios.post(`${API_URL}/playlist/${playlistID}`, { playlistName: playlistName });

    if (response.status === 200) {
      videoDispatch({ type: 'UPDATE_PLAYLIST_NAME', payload: { playlistID, name: playlistName } });
    }
  } catch (error) {
    console.error('Error updating playlist name', error);
  }
};

export const removeVideoFromPlaylist = async (playlistID, videoID, videoDispatch, video) => {
  try {
    const response = await axios.delete(`${API_URL}/playlist/${playlistID}/${videoID}`);

    if (response.status === 200) {
      videoDispatch({ type: 'TOGGLE_VIDEO_IN_PLAYLIST', payload: { video, playlistID } });
    }
  } catch (error) {
    console.error('Error removing video from playlist', error);
  }
};

export const toggleVideoInPlaylist = async (playlistID, videoID, isInPlaylist, videoDispatch, video) => {
  try {
    let response;

    if (isInPlaylist(playlistID)) {
      response = await axios.delete(`${API_URL}/playlist/${playlistID}/${videoID}`);
    } else {
      response = await axios.post(`${API_URL}/playlist/${playlistID}/${videoID}`);
    }

    if (response.status === 200) {
      videoDispatch({ type: 'TOGGLE_VIDEO_IN_PLAYLIST', payload: { video, playlistID } });
    }
  } catch (error) {
    console.error('Error toggling in playlist', error);
  }
};

export const createNewPlaylist = async (playlistName, videoDispatch, videoID, video, setplaylistName) => {
  if (playlistName !== '') {
    const response = await axios.post(`${API_URL}/playlist/`, { videoID: videoID, playlistName: playlistName });

    if (response.status === 200) {
      videoDispatch({ type: 'CREATE_PLAYLIST', payload: { _id: response.data.newPlaylist._id, playlistName, video } });
      setplaylistName('');
    }
  }
};
