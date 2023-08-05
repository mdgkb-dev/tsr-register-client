import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminDrugArrivesList from '@/components/admin/DrugArrives/AdminDrugArrivesList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/drug-arrives',
    name: 'AdminDrugArrivesList',
    component: AdminDrugArrivesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
];
