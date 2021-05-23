import { data } from '../../data';
import { VideoCard } from './components/VideoCard';
import styles from './VideoListing.module.css';

export function VideoListing() {
  return (
    <div className={styles.container}>
      {data.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
