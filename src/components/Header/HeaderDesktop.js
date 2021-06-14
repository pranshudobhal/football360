import styles from './HeaderDesktop.module.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/';

export function HeaderDesktop() {
  const { token, logoutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <NavLink to="/" className={styles.navlink}>
        <div className={styles.logo}>
          <h2>
            Football<span>360</span>
          </h2>
        </div>
      </NavLink>
      <div className={styles.search}>
        <input type="search" id="search-bar" name="search-bar" placeholder="Search" />
        <span>
          <SearchOutlinedIcon style={{ fontSize: 25, color: 'white' }} />
        </span>
      </div>
      <div className={styles.user}>{token ? <ExitToAppIcon onClick={logoutUser} /> : <AccountCircleIcon onClick={() => navigate('/login')} style={{ fontSize: 27 }} />}</div>
    </div>
  );
}
