import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminDrugStore from '@/components/admin/DrugStore/AdminDrugStore.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/drug-store',
    name: 'AdminDrugStore',
    component: AdminDrugStore,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
];
