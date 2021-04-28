import { data } from '../../data';
import { VideoCard } from '../Home/components/VideoCard';
import styles from './Trending.module.css';

export function Trending() {
  return (
    <div className={styles.container}>
      {[...data].reverse().map((video) => (
        <VideoCard video={video} />
      ))}
    </div>
  );
}
