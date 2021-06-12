import axios from 'axios';
import { useData } from '../../context';
import { HistoryCard } from './components/HistoryCard';
import styles from './History.module.css';
import { Header, Navbar, Loader } from '../../components';

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
    <>
      <Header />
      <Navbar />
      <div className={styles.historyContainer}>
        <div className={styles.heading}>
          <h1>History</h1>
          <button onClick={() => history !== null && clearAllHistory()}>Clear all history</button>
        </div>
        {history === null ? (
          <Loader />
        ) : (
          <div className={styles.container}>
            {history && [...history].reverse().map((video) => <HistoryCard key={video._id} video={video} />)}
            {history?.length === 0 && (
              <div className={styles.noHistory}>
                <h3>No watch history</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
