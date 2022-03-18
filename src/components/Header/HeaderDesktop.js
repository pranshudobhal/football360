import styles from './HeaderDesktop.module.css';
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
      <div className={styles.user}>{token ? <button onClick={logoutUser}>Logout</button> : <button onClick={() => navigate('/login')}>Login</button>}</div>
    </div>
  );
}
