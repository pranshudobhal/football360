import { useData } from '../../context';
import { HistoryCard } from './components/HistoryCard';
import styles from './History.module.css';

export function History() {
  const { history, videoDispatch } = useData();

  return (
    <div className={styles.historyContainer}>
      <div className={styles.heading}>
        <h1>History</h1>
        <button onClick={() => videoDispatch({ type: 'CLEAR_WATCH_HISTORY' })}>Clear all history</button>
      </div>
      <div className={styles.container}>
        {[...history].reverse().map((video) => (
          <HistoryCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
