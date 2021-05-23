import styles from './HeaderDesktop.module.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavLink } from 'react-router-dom';

export function HeaderDesktop() {
  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.navlink}>
        <div className={styles.logo}>
          <h2>Football360</h2>
        </div>
      </NavLink>
      <div className={styles.search}>
        <input type="search" id="search-bar" name="search-bar" placeholder="Search" />
        <SearchOutlinedIcon style={{ fontSize: 25 }} color="disabled" />
      </div>
      <div className={styles.user}>
        <AccountCircleIcon style={{ fontSize: 27 }} />
      </div>
    </div>
  );
}
