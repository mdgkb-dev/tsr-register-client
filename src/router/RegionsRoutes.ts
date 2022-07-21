import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import RegionList from '@/components/Regions/RegionList.vue';
import RegionPage from '@/components/Regions/RegionPage.vue';

export default [
  {
    path: '/regions',
    name: 'Regions',
    component: RegionList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
  {
    path: '/regions/new',
    name: 'CreateRegion',
    component: RegionPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
  {
    path: '/regions/:regionId',
    name: 'EditRegion',
    component: RegionPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
];
