/**
 * TODO
 * Clear all history button
 */

import { useData } from '../../context';
import { HistoryCard } from './components/HistoryCard';
import styles from './History.module.css';

export function History() {
  const { history } = useData();

  return (
    <div className={styles.historyContainer}>
      <div className={styles.heading}>
        <h1>History</h1>
        {/* <button>Clear all history</button> */}
      </div>
      <div className={styles.container}>
        {[...history].reverse().map((video) => (
          <HistoryCard video={video} />
        ))}
      </div>
    </div>
  );
}
