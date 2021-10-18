import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import RegisterExportPage from '@/components/RegisterExports/RegisterExportPage.vue';
import RegisterExports from '@/components/RegisterExports/RegisterExportsList.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/register-exports',
    name: 'RegisterExports',
    component: RegisterExports,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/register-exports/new',
    name: 'CreateRegisterExport',
    component: RegisterExportPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/register-exports/:registerExportId',
    name: 'EditRegisterExport',
    component: RegisterExportPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
