import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AnthropometryList from '@/components/Anthropometry/AnthropometryList.vue';
import AnthropometryPage from '@/components/Anthropometry/AnthropometryPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/anthropometry',
    name: 'AnthropometryList',
    component: AnthropometryList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/anthropometry/new',
    name: 'CreateAnthropometry',
    component: AnthropometryPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/anthropometry/:anthropometryId',
    name: 'EditAnthropometry',
    component: AnthropometryPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
