import Home from '../pages/home';

const homeRoutes = [
  {
    path: '',
    exact: true,
    secured: true,
    element: Home,
    feature: 'home',
  },
];
export default homeRoutes;
