/**
 * Video Card for Homepage videos
 */

import { useData } from '../../../context';
import { Link } from 'react-router-dom';
import styles from './VideoCard.module.css';

export function VideoCard({ video }) {
  const { id, name, channel, videoThumbnail, views } = video;
  const { videoDispatch } = useData();

  return (
    <div key={id} className={styles.container}>
      <Link to={`/${id}`} className={styles.link}>
        <div onClick={() => videoDispatch({ type: 'ADD_VIDEO_TO_WATCH_HISTORY', payload: video })}>
          <img src={videoThumbnail} className={styles.image} alt={name} />
        </div>
      </Link>

      <div className={styles.description}>
        <Link to={`/${id}`} className={styles.link}>
          <h3 className={styles.title} onClick={() => videoDispatch({ type: 'ADD_VIDEO_TO_WATCH_HISTORY', payload: video })}>
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
