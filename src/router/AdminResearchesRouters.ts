import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminResearchesList from '@/components/admin/Researches/AdminResearchesList.vue';
import AdminResearchPage from '@/components/admin/Researches/AdminResearchPage.vue';
import { authGuard, isAuthorized } from '@/router/index';
// import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/researches',
    name: 'AdminResearchesList',
    component: AdminResearchesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },

  {
    path: '/admin/researches/new',
    name: 'AdminNewResearchPage',
    component: AdminResearchPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
  {
    path: '/admin/researches/history/:researchId/:researchHistoryId',
    name: 'ResearchesHistoryPage',
    component: AdminResearchPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
  {
    path: '/admin/researches/:id',
    name: 'AdminEditResearchPage',
    component: AdminResearchPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
  // {
  //   path: '/admin/researches/:id/:mode',
  //   name: 'Research',
  //   component: AdminResearchPage,
  //   beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
  //     isAuthorized(next);
  //   },
  // },
];
