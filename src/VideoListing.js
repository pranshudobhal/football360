import { data } from './data';
import { VideoCard } from './VideoCard';

export function VideoListing() {
  return (
    <div className="App">
      {data.map((video) => (
        <VideoCard video={video} />
      ))}
    </div>
  );
}
