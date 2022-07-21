import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import RepresentativeTypePage from '@/components/RepresentativeTypes/RepresentativeTypePage.vue';
import RepresentativeTypesList from '@/components/RepresentativeTypes/RepresentativeTypesList.vue';

export default [
  {
    path: '/representative-types',
    name: 'RepresentativeTypes',
    component: RepresentativeTypesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
  {
    path: '/representative-types/new',
    name: 'CreateRepresentativeType',
    component: RepresentativeTypePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
  {
    path: '/representative-types/:representativeTypeId',
    name: 'EditRepresentativeType',
    component: RepresentativeTypePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
];
