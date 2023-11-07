import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminDrugApplicationsList from '@/components/admin/DrugApplications/AdminDrugApplicationsList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/drug-applications',
    name: 'AdminDrugApplicationsList',
    component: AdminDrugApplicationsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
];
