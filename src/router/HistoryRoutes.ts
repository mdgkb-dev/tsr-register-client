import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import HistoryList from '@/components/History/HistoryList.vue';
import HistoryPatientsList from '@/components/History/HistoryPatientsList.vue';

export default [
  {
    path: '/history',
    name: 'HistoryList',
    component: HistoryList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
  {
    path: '/history/patients',
    name: 'HistoryPatientsList',
    component: HistoryPatientsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      // isAuthorized(next);
    },
  },
];
