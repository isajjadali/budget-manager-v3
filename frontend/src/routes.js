// Pages
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";
import ProjectListPage from './pages/Projects/ListPage';
import ProjectUpdatePage from './pages/Projects/UpdatePage';

export default [
  {
    path: "/",
    component: LoginPage,
    name: 'login',
    meta: { authNotRequired: true }
  },

  { 
    path: "/dashboard",
    component: DashBoardPage,
    name: 'dashboard',
    children: [
      {
        path: "projects", 
        component: ProjectListPage, 
        name: 'all-project',
      },
      {
        path: "projects/:id",
        component: ProjectUpdatePage,
        name: 'edit-project',
      },
      {
        path: '*',
        redirect: 'projects'
      },
    ],
  },

  {
    path: '*',
    redirect: '/dashboard/projects'
  },
];
