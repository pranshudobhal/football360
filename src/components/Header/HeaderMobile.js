import styles from './HeaderMobile.module.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';

export function HeaderMobile() {
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
      <div className={styles.actions}>
        <SearchOutlinedIcon style={{ fontSize: 25 }} color="disabled" />
        {token ? <ExitToAppIcon onClick={logoutUser} /> : <AccountCircleIcon onClick={() => navigate('/login')} style={{ fontSize: 27 }} />}
      </div>
    </div>
  );
}
