import axios from 'axios';
import { API_URL } from '../../utils';

export const clearAllHistory = async (videoDispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/history`);

    if (response.status === 200) {
      videoDispatch({ type: 'CLEAR_WATCH_HISTORY' });
    }
  } catch (error) {
    console.error('Error clearing all history ', error);
  }
};

export const addToWatchHistory = async (videoID, videoDispatch, video) => {
  try {
    const response = await axios.post(`${API_URL}/history/${videoID}`);

    if (response.status === 200) {
      videoDispatch({ type: 'ADD_VIDEO_TO_WATCH_HISTORY', payload: video });
    }
  } catch (error) {
    console.error('Error adding to watch history ', error);
  }
};
