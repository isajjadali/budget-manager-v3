// Pages
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";
import PageNotFound from "./pages/PageNotFound";

export default [
  {
    path: "/",
    component: LoginPage,
    name: 'login',
    meta: { authNotRequired: true }
  },
  { path: "/dashboard", component: DashBoardPage, name: 'dashboard' },
  {
    path: '*',
    component: PageNotFound
  }
];
