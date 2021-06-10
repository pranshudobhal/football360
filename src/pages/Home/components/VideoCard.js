/**
 * Video Card for Homepage videos
 */

import { useData } from '../../../context';
import { Link } from 'react-router-dom';
import styles from './VideoCard.module.css';
import axios from 'axios';

export function VideoCard({ video }) {
  const { _id: id, name, channel, videoThumbnail, views } = video;
  const { videoDispatch } = useData();

  const addToWatchHistory = async (videoID) => {
    try {
      const response = axios.post(`http://localhost:3000/history/${videoID}`);

      if (response.status === 200) {
        videoDispatch({ type: 'ADD_VIDEO_TO_WATCH_HISTORY', payload: video });
      }
    } catch (error) {
      console.error('Error adding to watch history ', error);
    }
  };

  return (
    <div key={id} className={styles.container}>
      <Link to={`/${id}`} className={styles.link}>
        <div onClick={() => addToWatchHistory(id)}>
          <img src={videoThumbnail} className={styles.image} alt={name} />
        </div>
      </Link>

      <div className={styles.description}>
        <Link to={`/${id}`} className={styles.link}>
          <h3 className={styles.title} onClick={() => addToWatchHistory(id)}>
            {name}
          </h3>
        </Link>
        <p className={styles.channel}>
          {channel} &bull; {views} views
        </p>
      </div>
    </div>
  );
}
