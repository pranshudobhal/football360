import axios from 'axios';
import { API_URL } from '../../utils';

export const toggleLikedVideos = async (videoID, isInLikedVideos, videoDispatch, video) => {
  try {
    let response;
    if (isInLikedVideos) {
      response = await axios.delete(`${API_URL}/likedvideo/${videoID}`);
    } else {
      response = await axios.post(`${API_URL}/likedvideo/${videoID}`);
    }

    if (response.status === 200) {
      videoDispatch({ type: 'TOGGLE_LIKED_VIDEO', payload: video });
    }
  } catch (error) {
    console.error('Error toggling in Liked Videos ', error);
  }
};
