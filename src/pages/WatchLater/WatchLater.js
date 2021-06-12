import { useData } from '../../context';
import { WatchLaterCard } from './components/WatchLaterCard';
import styles from './WatchLater.module.css';
import { Header, Navbar, Loader } from '../../components';

export function WatchLater() {
  const { watchLater } = useData();

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.watchLaterContainer}>
        <div className={styles.heading}>
          <h1>Watch Later</h1>
        </div>
        {watchLater === null ? (
          <Loader />
        ) : (
          <div className={styles.container}>
            {watchLater.map((video) => (
              <WatchLaterCard key={video._id} video={video} />
            ))}
            {watchLater?.length === 0 && (
              <div className={styles.noWatchLater}>
                <h3>No videos to watch later</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
