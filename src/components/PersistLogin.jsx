import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectCurrentToken,
  setCredentials,
} from '../features/auth/reducers/authSlice';

const PersistLogin = () => {
  const dispatch = useDispatch();

  const access = localStorage.getItem('access') || false;

  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    if (!token && access) {
      dispatch(setCredentials({ access }));
    }
  }, []);

  return access && !token ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;
