import styles from './Library.module.css';
import HistoryIcon from '@material-ui/icons/History';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import { Link } from 'react-router-dom';
import { Header, Navbar } from '../../components';

export function Library() {
  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.container}>
        <ul className={styles.list}>
          <Link to="/history" className={styles.link}>
            <li>
              <HistoryIcon />
              <span>History</span>
            </li>
          </Link>
          <Link to="/watchlater" className={styles.link}>
            <li>
              <WatchLaterOutlinedIcon />
              <span> Watch Later</span>
            </li>
          </Link>
          <Link to="/likedvideos" className={styles.link}>
            <li>
              <ThumbUpAltOutlinedIcon />
              <span>Liked Videos</span>
            </li>
          </Link>
          <Link to="/playlist" className={styles.link}>
            <li>
              <PlaylistPlayIcon />
              <span>Playlist</span>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}
