// Pages
import LoginPage from './pages/LoginPage';
import DashBoardPage from './pages/DashBoardPage';
import ProjectListPage from './pages/Projects/ListPage';
import ProjectUpdatePage from './pages/Projects/UpdatePage';
import EmployeeListPage from './pages/Employees/ListPage';
import EmployeeUpdatePage from './pages/Employees/UpdatePage';
import ActivitiesListPage from './pages/Activities/ListPage';
import ActivitiesUpdatePage from './pages/Activities/UpdatePage';
import LayoutPage from '@/pages/LayoutPage';

export default [
  {
    path: '/login',
    component: LoginPage,
    name: 'login',
    meta: { authNotRequired: true },
  },
  {
    path: '/',
    component: LayoutPage,
    name: 'index',
    children: [
      {
        path: 'dashboard',
        component: DashBoardPage,
        name: 'dashboard',
      },
      {
        path: 'projects',
        component: ProjectListPage,
        name: 'all-project',
      },
      {
        path: 'projects/:id',
        component: ProjectUpdatePage,
        name: 'edit-project',
      },
      {
        path: 'employees',
        component: EmployeeListPage,
        name: 'all-employee',
      },
      {
        path: 'employees/:id',
        component: EmployeeUpdatePage,
        name: 'edit-employee',
      },
      {
        path: 'activities',
        component: ActivitiesListPage,
        name: 'all-activities',
      },
      {
        path: 'activities/:id',
        component: ActivitiesUpdatePage,
        name: 'edit-activity',
      },
      {
        path: '*',
        redirect: 'projects',
      },
    ],
    redirect: '/dashboard',
  },
];
