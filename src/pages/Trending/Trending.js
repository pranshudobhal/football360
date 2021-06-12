import { useData } from '../../context';
import { VideoCard } from '../Home/components/VideoCard';
import styles from './Trending.module.css';
import { Header, Navbar, Loader } from '../../components';

export function Trending() {
  const { videos } = useData();

  return (
    <>
      <Header />
      <Navbar />
      {videos === null ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          {[...videos].reverse().map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </>
  );
}
