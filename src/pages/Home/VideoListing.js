import { VideoCard } from './components/VideoCard';
import styles from './VideoListing.module.css';
import { useData } from '../../context';

export function VideoListing() {
  const { videos } = useData();

  return <div className={styles.container}>{videos !== null && videos.map((video) => <VideoCard key={video._id} video={video} />)}</div>;
}
