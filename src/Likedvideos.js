import { useData } from './dataContext';
import { LikedVideosCard } from './LikedVideosCard';

export function Likedvideos() {
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
