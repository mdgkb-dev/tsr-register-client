import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminUserPage from '@/components/admin/Users/AdminUserPage.vue';
import AdminUsersList from '@/components/admin/Users/AdminUsersList.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/users',
    name: 'AdminUsersList',
    component: AdminUsersList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
  {
    path: '/admin/users/history/:userId/:userHistoryId',
    name: 'UsersHistoryPage',
    component: AdminUserPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
  {
    path: '/admin/users/:id',
    name: 'AdminEditUserPage',
    component: AdminUserPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
];
