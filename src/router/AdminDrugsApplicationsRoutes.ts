import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminCommissionsList from '@/components/admin/Commissions/AdminCommissionsList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/commissions',
    name: 'AdminCommissionsList',
    component: AdminCommissionsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
];
