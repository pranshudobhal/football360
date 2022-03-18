import { useData } from '../../context';
import { HistoryCard } from './components/HistoryCard';
import styles from './History.module.css';
import { Header, Navbar, Loader } from '../../components';
import { clearAllHistory } from '../../services';

export function History() {
  const { history, videoDispatch } = useData();

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.historyContainer}>
        <div className={styles.heading}>
          <h1>History</h1>
          <button onClick={() => history !== null && clearAllHistory(videoDispatch)}>Clear all history</button>
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
