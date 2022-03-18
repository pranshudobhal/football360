import styles from './NavbarDesktop.module.css';
import { NavLink } from 'react-router-dom';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import HistoryIcon from '@material-ui/icons/History';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

export function NavbarDesktop() {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <NavLink end to="/" activeClassName={styles.active} className={styles.navlink}>
          <li>
            <HomeOutlinedIcon />
            <span>Home</span>
          </li>
        </NavLink>
        <NavLink activeClassName={styles.active} className={styles.navlink} to="/trending">
          <li>
            <WhatshotOutlinedIcon />
            <span>Trending</span>
          </li>
        </NavLink>
      </ul>
      <ul className={styles.list}>
        <NavLink activeClassName={styles.active} className={styles.navlink} to="/history">
          <li>
            <HistoryIcon />
            <span>History</span>
          </li>
        </NavLink>
        <NavLink activeClassName={styles.active} className={styles.navlink} to="/watchlater">
          <li>
            <WatchLaterOutlinedIcon />
            <span>Watch</span> Later
          </li>
        </NavLink>
        <NavLink activeClassName={styles.active} className={styles.navlink} to="/likedvideos">
          <li>
            <ThumbUpAltOutlinedIcon />
            <span>Liked Videos</span>
          </li>
        </NavLink>
        <NavLink activeClassName={styles.active} className={styles.navlink} to="/playlist">
          <li>
            <PlaylistPlayIcon />
            <span>Playlist</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}
