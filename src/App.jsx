import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin';

import Login from './features/auth/pages/Login';
import RequireAuth from './features/auth/utils/RequireAuth';

import ProtecedRoutes from './routes/protected.routes';

const App = () => {
  return (
    <div className='app'>
      <div className='main-wrapper'>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* public routes */}
            <Route path='login' element={<Login />} />

            {/* protected routes */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                {ProtecedRoutes.map((route) => (
                  <Route
                    path={route.path}
                    key={route.feature}
                    exact={route.exact}
                    element={
                      <>
                        {/* Header component goes here */}
                        <div className='body-container'>
                          <route.element />
                        </div>
                      </>
                    }
                  />
                ))}
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
