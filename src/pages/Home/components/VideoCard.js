/**
 * Video Card for Homepage videos
 */

import { useAuth, useData } from '../../../context';
import { Link } from 'react-router-dom';
import styles from './VideoCard.module.css';
import { addToWatchHistory } from '../../../services';

export function VideoCard({ video }) {
  const { _id: id, name, channel, videoThumbnail, views } = video;
  const { videoDispatch } = useData();

  const { token } = useAuth();

  return (
    <div key={id} className={styles.container}>
      <Link to={`/${id}`} className={styles.link}>
        <div onClick={() => token && addToWatchHistory(id, videoDispatch, video)}>
          <img src={videoThumbnail} className={styles.image} alt={name} />
        </div>
      </Link>

      <div className={styles.description}>
        <Link to={`/${id}`} className={styles.link}>
          <h3 className={styles.title} onClick={() => token && addToWatchHistory(id, videoDispatch, video)}>
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
