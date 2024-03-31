import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminResearchesPoolsList from '@/components/admin/Researches/AdminResearchesPoolsList.vue';
import AdminResearchesPoolPage from '@/components/admin/Researches/AdminResearchesPoolPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/researches-pools',
    name: 'AdminResearchesPoolsList',
    component: AdminResearchesPoolsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
  {
    path: '/admin/researches-pools/new',
    name: 'AdminNewResearchesPoolPage',
    component: AdminResearchesPoolPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
  // {
  //   path: '/admin/researches-pools/history/:researchId/:researchHistoryId',
  //   name: 'ResearchesPoolHistoryPage',
  //   component: AdminResearchesPoolPage,
  //   beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
  //     isAuthorized(next);
  //     authGuard();
  //   },
  // },
  {
    path: '/admin/researches-pools/:id',
    name: 'AdminEditResearchesPoolPage',
    component: AdminResearchesPoolPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
];
