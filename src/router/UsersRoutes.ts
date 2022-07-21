import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import UserPage from '@/components/Users/UserPage.vue';
import UsersList from '@/components/Users/UsersList.vue';

export default [
  {
    path: '/users',
    name: 'Users',
    component: UsersList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
  {
    path: '/users/new',
    name: 'CreateUser',
    component: UserPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
  {
    path: '/users/:userId',
    name: 'EditUser',
    component: UserPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
];
