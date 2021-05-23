import { useData } from '../../context';
import { LikedVideosCard } from './components/LikedVideosCard';
import styles from './LikedVideos.module.css';

export function LikedVideos() {
  const { likedVideos } = useData();

  return (
    <div className={styles.likedVideosContainer}>
      <div className={styles.heading}>
        <h1>Liked Videos</h1>
      </div>
      <div className={styles.container}>
        {likedVideos.map((video) => (
          <LikedVideosCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
