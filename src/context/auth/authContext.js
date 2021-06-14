import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router';

const AuthContext = createContext();

const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common['Authorization'] = token);
  }
  delete axios.defaults.headers.common['Authorization'];
};

const setupAuthExceptionHandler = (logout, navigate) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logout();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );
};

const loginService = (email, password) => {
  return axios.post('http://localhost:3000/login', {
    email: email,
    password: password,
  });
};

const signUpService = (firstName, lastName, email, password) => {
  return axios.post('http://localhost:3000/user', {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
};

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage?.getItem('login'));
  const [token, setToken] = useState(localStorageToken?.token);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    token && setupAuthHeaderForServiceCalls(token);
    !token && setupAuthExceptionHandler(logoutUser, navigate);
  });

  useEffect(() => {
    token &&
      (async function getUserData() {
        try {
          const userResponse = await axios.get('http://localhost:3000/user');
          setUser(userResponse.data.user);
        } catch (error) {
          console.error('Error getting user data ', error);
        }
      })();
  }, []);

  const loginUserWithCredentials = async (email, password, state) => {
    try {
      const {
        data: { token },
        status,
      } = await loginService(email, password);

      if (status === 200) {
        localStorage?.setItem('login', JSON.stringify({ token: token }));
        setToken(token);
        setupAuthHeaderForServiceCalls(token);
        state === null ? navigate('/') : navigate(state.from ? state.from : '/');
      }
    } catch (error) {
      const { response, message } = error;

      if (response.status === 401) {
        return navigate('/login');
      }
      console.error('Error with login ', message);
    }
  };

  const signUpUser = async (firstName, lastName, email, password, state) => {
    try {
      const {
        data: { token },
        status,
      } = await signUpService(firstName, lastName, email, password);

      if (status === 200) {
        localStorage?.setItem('login', JSON.stringify({ token: token }));
        setToken(token);
        setupAuthHeaderForServiceCalls(token);
        state === null ? navigate('/') : navigate(state.from ? state.from : '/');
      }
    } catch (error) {
      console.error('Error signing up user', error);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage?.removeItem('login');
    setupAuthHeaderForServiceCalls(null);
    navigate('/');
  };

  return <AuthContext.Provider value={{ user, token, signUpUser, loginUserWithCredentials, logoutUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
