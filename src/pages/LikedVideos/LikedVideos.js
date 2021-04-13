import { useData } from '../../context';
import { LikedVideosCard } from './components/LikedVideosCard';

export function LikedVideos() {
  const { likedVideos } = useData();

  return (
    <>
      <h1>Liked Videos</h1>
      <div className="App">
        {likedVideos.map((video) => (
          <LikedVideosCard video={video} />
        ))}
      </div>
    </>
  );
}
