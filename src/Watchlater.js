import { useData } from './dataContext';
import { WatchLaterCard } from './WatchLaterCard';

export function Watchlater() {
  const { watchLater } = useData();

  return (
    <>
      <h1>Watch Later</h1>
      <div className="App">
        {watchLater.map((video) => (
          <WatchLaterCard video={video} />
        ))}
      </div>
    </>
  );
}
