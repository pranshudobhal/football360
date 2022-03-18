import styles from './NavbarMobile.module.css';
import { NavLink } from 'react-router-dom';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';

export function NavbarMobile() {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <NavLink end to="/" activeClassName={styles.active} className={styles.navlink}>
          <li>
            <HomeOutlinedIcon />
            Home
          </li>
        </NavLink>
        <NavLink activeClassName={styles.active} className={styles.navlink} to="/trending">
          <li>
            <WhatshotOutlinedIcon />
            Trending
          </li>
        </NavLink>
        <NavLink activeClassName={styles.active} className={styles.navlink} to="/library">
          <li>
            <VideoLibraryOutlinedIcon />
            Library
          </li>
        </NavLink>
      </ul>
    </div>
  );
}
