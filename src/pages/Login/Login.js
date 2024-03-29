import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Header } from '../../components';
import { useAuth } from '../../context/auth/authContext';
import styles from './Login.module.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, loginUser } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const loginHandler = async () => {
    if (email && password !== '') {
      const loginResponse = await loginUser(email, password, state);

      if (loginResponse === 401) {
        setError('Invalid username or password');
      }
    } else {
      setError('');
    }
  };

  useEffect(() => {
    token && navigate('/');
  }, [token, navigate]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h1>Login</h1>
          <p>{error !== '' && error}</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(() => e.target.value)} />
            <br />
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(() => e.target.value)} />
            <br />
            <br />
            <button onClick={loginHandler}>Login</button>
          </form>
          <p>
            <span
              onClick={() => {
                setEmail('test@gmail.com');
                setPassword('test');
              }}
            >
              Use guest credentials
            </span>
            !!
          </p>
          <p>
            Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
          </p>
        </div>
      </div>
    </>
  );
}
