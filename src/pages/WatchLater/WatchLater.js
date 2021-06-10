import { useData } from '../../context';
import { WatchLaterCard } from './components/WatchLaterCard';
import styles from './WatchLater.module.css';

export function WatchLater() {
  const { watchLater } = useData();

  return (
    <div className={styles.watchLaterContainer}>
      <div className={styles.heading}>
        <h1>Watch Later</h1>
      </div>
      <div className={styles.container}>
        {watchLater.map((video) => (
          <WatchLaterCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
