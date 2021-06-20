import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Header } from '../../components';
import { useAuth } from '../../context/auth/authContext';
import styles from './SignUp.module.css';

export function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, signUpUser } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const signUpHandler = async () => {
    if (firstName && email && password !== '') {
      const signUpResponse = await signUpUser(firstName, lastName, email, password, state);

      if (signUpResponse === 409) {
        setError('User already exists!');
      }
    } else {
      setError('Please fill all required fields!');
    }
  };

  useEffect(() => {
    token && navigate('/');
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <h1>Login</h1>
          <p>{error !== '' && error}</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="firstname">First Name: </label>
            <input type="text" id="firstname" name="firstname" value={firstName} onChange={(e) => setFirstName(() => e.target.value)} required /> <br />
            <label htmlFor="lastname">Last Name: </label>
            <input type="text" id="lastname" name="lastname" value={lastName} onChange={(e) => setLastName(() => e.target.value)} />
            <br />
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(() => e.target.value)} required />
            <br />
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(() => e.target.value)} required />
            <br />
            <br />
            <button onClick={signUpHandler}>SignUp</button>
          </form>
        </div>
      </div>
    </>
  );
}
