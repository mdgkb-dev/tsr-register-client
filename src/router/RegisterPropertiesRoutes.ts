import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import RegisterPropertyList from '@/components/RegisterProperties/RegisterPropertyList.vue';
import RegisterPropertyPage from '@/components/RegisterProperties/RegisterPropertyPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/register-properties',
    name: 'RegisterProperties',
    component: RegisterPropertyList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/register-properties/new',
    name: 'CreateRegisterProperty',
    component: RegisterPropertyPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/register-properties/:registerPropertyId',
    name: 'EditRegisterProperty',
    component: RegisterPropertyPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
