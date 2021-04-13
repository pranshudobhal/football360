import { useData } from '../../context';
import { WatchLaterCard } from './components/WatchLaterCard';

export function WatchLater() {
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
