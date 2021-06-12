import { useData } from '../../context';
import { LikedVideosCard } from './components/LikedVideosCard';
import styles from './LikedVideos.module.css';
import { Loader } from '../../components';

export function LikedVideos() {
  const { likedVideos } = useData();

  return (
    <div className={styles.likedVideosContainer}>
      <div className={styles.heading}>
        <h1>Liked Videos</h1>
      </div>
      {likedVideos === null ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          {likedVideos.map((video) => (
            <LikedVideosCard key={video._id} video={video} />
          ))}
          {likedVideos?.length === 0 && (
            <div className={styles.noLikedVideos}>
              <h3>Like some videos to show them here</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
