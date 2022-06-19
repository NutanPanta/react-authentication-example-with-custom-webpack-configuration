import Home from '../pages/Home';
const homeRoutes = [
  {
    path: '/',
    exact: true,
    secured: false,
    element: <Home />,
    feature: 'home',
  },
];
export default homeRoutes;
