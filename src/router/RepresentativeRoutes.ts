import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import RepresentativePage from '@/components/Representatives/RepresentativePage.vue';
import RepresentativesList from '@/components/Representatives/RepresentativesList.vue';

export default [
  {
    path: '/representatives',
    name: 'Representatives',
    component: RepresentativesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
  {
    path: '/representatives/new',
    name: 'CreateRepresentative',
    component: RepresentativePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
  {
    path: '/representatives/:representativeId',
    name: 'EditRepresentative',
    component: RepresentativePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
];
