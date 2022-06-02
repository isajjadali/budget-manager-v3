// Pages
import LoginPage from './pages/LoginPage';
import DashBoardPage from './pages/DashBoardPage';
import ProjectListPage from './pages/Projects/ListPage';
import EmployeeListPage from './pages/Employees/ListPage';
import ActivitiesListPage from './pages/Activities/ListPage';
import PayinsListPage from './pages/Payins/ListPage';
import LayoutPage from '@/pages/LayoutPage';
import ProjectCreatePage from '@/pages/Projects/CreatePage';

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
        path: 'create-project',
        component: ProjectCreatePage,
        name: 'create-project',
      },
      {
        path: 'update-project/:id',
        component: ProjectCreatePage,
        name: 'update-project',
      },
      {
        path: 'employees',
        component: EmployeeListPage,
        name: 'all-employee',
      },
      {
        path: 'activities',
        component: ActivitiesListPage,
        name: 'all-activities',
      },
      {
        path: 'payins',
        component: PayinsListPage,
        name: 'all-payins',
      },
      {
        path: '*',
        redirect: 'projects',
      },
    ],
    redirect: '/dashboard',
  },
];
