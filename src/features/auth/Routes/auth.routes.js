import Login from "../pages/Login";
const authRoute = [
  {
    path: "/login",
    exact: true,
    secured: false,
    element: <Login />,
    feature: "login",
  },
];
export default authRoute;
