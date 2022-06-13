// Pages
import LoginPage from './pages/LoginPage';
import DashBoardPage from './pages/DashBoardPage';
import ProjectListPage from './pages/Projects/ListPage';
import EmployeeListPage from './pages/Employees/ListPage';
import ActivitiesListPage from './pages/Activities/ListPage';
import PayinsListPage from './pages/Payins/ListPage';
import LayoutPage from '@/pages/LayoutPage';
import ProjectCreatePage from '@/pages/Projects/CreatePage';
import ProjectUpdatePage from '@/pages/Projects/UpdatePage';
import ProjectIndexPage from '@/pages/Projects/IndexPage';
import ProjectDetailPage from '@/pages/Projects/DetailPage';

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
        path: 'project',
        component: ProjectIndexPage,
        name: 'project-index',
        children: [
          {
            path: '',
            redirect: 'list',
          },
          {
            path: 'list',
            component: ProjectListPage,
            name: 'all-projects',
          },
          {
            path: 'create',
            component: ProjectCreatePage,
            name: 'create-project',
          },
          {
            path: 'update/:id',
            component: ProjectUpdatePage,
            name: 'update-project',
          },
          {
            path: 'detail/:id',
            component: ProjectDetailPage,
            name: 'detail-project',
          },
        ],
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
        redirect: '/dashboard',
      },
    ],
  }
];
