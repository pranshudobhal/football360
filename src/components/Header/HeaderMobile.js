import styles from './HeaderMobile.module.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { NavLink } from 'react-router-dom';

export function HeaderMobile() {
  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.navlink}>
        <div className={styles.logo}>
          <h2>Football360</h2>
        </div>
      </NavLink>
      <div className={styles.actions}>
        <SearchOutlinedIcon style={{ fontSize: 25 }} color="disabled" />
      </div>
    </div>
  );
}
