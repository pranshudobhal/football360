import { useData } from '../../context';
import { HistoryCard } from './components/HistoryCard';

export function History() {
  const { history } = useData();

  return (
    <>
      <h1>Watch History</h1>
      <div className="App">
        {[...history].reverse().map((video) => (
          <HistoryCard video={video} />
        ))}
      </div>
    </>
  );
}
