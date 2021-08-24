import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import DrugPage from '@/components/Drugs/DrugPage.vue';
import DrugsList from '@/components/Drugs/DrugsList.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/drugs',
    name: 'DrugsList',
    component: DrugsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/drugs/new',
    name: 'CreateDrug',
    component: DrugPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/drugs/:drugId',
    name: 'EditDrug',
    component: DrugPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
