import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AllRoutes from './routes/main.routes';
import NoRoutes from './components/NoRoutes';
import ProtectedRoute from './components/PortectedRoute';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './features/auth/reducers/authSlice';
import AuthRoutes from './features/auth/Routes/auth.routes';
import Header from './components/header';
import Sidebar from './components/sidebar';

const App = () => {
  const token = localStorage.getItem('token');
  const storedToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  if (!storedToken) {
    dispatch(
      setUser({
        token: token,
      })
    );
  }
  const { pathname } = window.location;

  return (
    <div className='app'>
      <div className='main-wrapper'>
        <BrowserRouter>
          <Routes>
            {!token &&
              AuthRoutes.map((route) => {
                return <Route key={route.feature} {...route} />;
              })}
            {AllRoutes.map((route) => {
              return (
                <Route
                  key={route.feature}
                  {...route}
                  exact={route.exact}
                  element={
                    <ProtectedRoute token={storedToken}>
                      <Sidebar />
                      <div className='contents'>
                        <div className='container-fluid'>
                          <Header /> {route.element}
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
              );
            })}
            <Route
              key='noRoutes'
              path='*'
              element={
                token && (pathname === '/' || pathname === '/login') ? (
                  <Navigate to='/home' />
                ) : token ? (
                  <NoRoutes />
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
