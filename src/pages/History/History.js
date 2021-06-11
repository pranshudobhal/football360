import axios from 'axios';
import { useData } from '../../context';
import { HistoryCard } from './components/HistoryCard';
import styles from './History.module.css';

export function History() {
  const { history, videoDispatch } = useData();

  const clearAllHistory = async () => {
    try {
      const response = await axios.delete('http://localhost:3000/history/');

      if (response.status === 200) {
        videoDispatch({ type: 'CLEAR_WATCH_HISTORY' });
      }
    } catch (error) {
      console.error('Error clearing all history ', error);
    }
  };

  return (
    <div className={styles.historyContainer}>
      <div className={styles.heading}>
        <h1>History</h1>
        <button onClick={() => clearAllHistory()}>Clear all history</button>
      </div>
      <div className={styles.container}>
        {history && [...history].reverse().map((video) => <HistoryCard key={video._id} video={video} />)}
        {history?.length === 0 && (
          <>
            <h1>No watch history</h1>
          </>
        )}
      </div>
    </div>
  );
}
