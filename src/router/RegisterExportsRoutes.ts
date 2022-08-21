import RegisterExportPage from '@/components/RegisterExports/RegisterExportPage.vue';
import RegisterExports from '@/components/RegisterExports/RegisterExportsList.vue';

export default [
  {
    path: '/register-exports',
    name: 'RegisterExports',
    component: RegisterExports,
  },
  {
    path: '/register-exports/new',
    name: 'CreateRegisterExport',
    component: RegisterExportPage,
  },
  {
    path: '/register-exports/:registerExportId',
    name: 'EditRegisterExport',
    component: RegisterExportPage,
  },
];
