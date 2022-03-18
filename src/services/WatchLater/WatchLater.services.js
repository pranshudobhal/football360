import axios from 'axios';
import { API_URL } from '../../utils';

export const toggleWatchLater = async (videoID, isInWatchLater, videoDispatch, video) => {
  try {
    let response;
    if (isInWatchLater) {
      response = await axios.delete(`${API_URL}/watchlater/${videoID}`);
    } else {
      response = await axios.post(`${API_URL}/watchlater/${videoID}`);
    }

    if (response.status === 200) {
      videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: video });
    }
  } catch (error) {
    console.error('Error toggling in watch later ', error);
  }
};
