import { defaultState } from '../features/auth/reducers/authSlice';

const isAuthorized = (data, dispatch, navigate) => {
  const logout = () => {
    localStorage.removeItem('token');
    dispatch(defaultState());
    navigate('/');
  };

  return data?.error?.status === 403 || data?.error?.status === 401
    ? logout()
    : true;
};

export default isAuthorized;
