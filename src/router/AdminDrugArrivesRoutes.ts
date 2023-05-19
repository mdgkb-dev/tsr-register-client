import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminDrugArrives from '@/components/admin/DrugArrives/AdminDrugArrives.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/drug-arrives',
    name: 'AdminDrugArrives',
    component: AdminDrugArrives,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
];
