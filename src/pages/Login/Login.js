import { useData } from '../../context';
import styles from './Login.module.css';

export function Login() {
  const { likedVideos } = useData();

  return (
    <div className={styles.likedVideosContainer}>
      <div className={styles.heading}>
        <h1>Liked Videos</h1>
      </div>
      <div className={styles.container}></div>
    </div>
  );
}
