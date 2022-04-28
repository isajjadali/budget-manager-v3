// Pages
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";
import ProjectListPage from './pages/Projects/ListPage';
import ProjectUpdatePage from './pages/Projects/UpdatePage';
import EmployeeListPage from './pages/Employees/ListPage';
import ActivitiesListPage from './pages/Activities/ListPage';

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
        path: "employees", 
        component: EmployeeListPage, 
        name: 'all-employee',
      },
      {
        path: "activities", 
        component: ActivitiesListPage, 
        name: 'all-activities',
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
