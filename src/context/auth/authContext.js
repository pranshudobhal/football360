import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router';
import { API_URL } from '../../utils';
import { loginService, signUpService } from '../../services';

const AuthContext = createContext();

const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common['Authorization'] = token);
  }
  delete axios.defaults.headers.common['Authorization'];
};

export const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage?.getItem('login'));
  const [token, setToken] = useState(localStorageToken?.token);
  token && setupAuthHeaderForServiceCalls(token);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 403) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const getUserData = async () => {
    try {
      const userResponse = await axios.get(`${API_URL}/user`);
      setUser(userResponse.data.user);
    } catch (error) {
      console.error('Error getting user data ', error);
    }
  };

  useEffect(() => {
    token && getUserData();
  }, []);

  const loginUser = async (email, password, state) => {
    try {
      const {
        data: { token },
        status,
      } = await loginService(email, password);

      if (status === 200) {
        localStorage?.setItem('login', JSON.stringify({ token: token }));
        setToken(token);
        setupAuthHeaderForServiceCalls(token);
        getUserData();
        state === null ? navigate('/') : navigate(state.from ? state.from : '/');
      }
      return status;
    } catch (error) {
      const {
        data: { message },
        status,
      } = error.response;

      if (status === 401) {
        return status;
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

      if (status === 201) {
        localStorage?.setItem('login', JSON.stringify({ token: token }));
        setToken(token);
        setupAuthHeaderForServiceCalls(token);
        getUserData();
        state === null ? navigate('/') : navigate(state.from ? state.from : '/');
      }
      return status;
    } catch (error) {
      const {
        data: { message },
        status,
      } = error.response;

      if (status === 409) {
        return status;
      }

      console.error('Error signing up user', message);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage?.removeItem('login');
    setupAuthHeaderForServiceCalls(null);
    navigate('/');
  };

  return <AuthContext.Provider value={{ user, token, signUpUser, loginUser, logoutUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
