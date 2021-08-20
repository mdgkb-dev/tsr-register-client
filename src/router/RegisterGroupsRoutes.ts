import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import RegisterGroupList from '@/components/RegisterGroups/RegisterGroupList.vue';
import RegisterGroupPage from '@/components/RegisterGroups/RegisterGroupPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/register-groups',
    name: 'RegisterGroups',
    component: RegisterGroupList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/register-groups/new',
    name: 'CreateRegisterGroup',
    component: RegisterGroupPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/register-groups/:registerGroupId',
    name: 'EditRegisterGroup',
    component: RegisterGroupPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
