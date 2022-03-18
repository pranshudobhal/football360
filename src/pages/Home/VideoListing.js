import { VideoCard } from './components/VideoCard';
import styles from './VideoListing.module.css';
import { useData } from '../../context';
import { Header, Navbar, Loader } from '../../components';

export function VideoListing() {
  const { videos } = useData();

  return (
    <>
      <Header />
      <Navbar />
      {videos === null ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </>
  );
}
