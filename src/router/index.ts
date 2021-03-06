import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import DisabilitiesList from '@/components/Disabilities/DisabilitiesList.vue';
import MkbList from '@/components/Mkb/MkbList.vue';
import AuthRoutes from '@/router/AuthRoutes';
import DocumentsRoutes from '@/router/DocumentsRoutes';
import DrugsRoutes from '@/router/DrugsRoutes';
import HistoryRoutes from '@/router/HistoryRoutes';
import InsuranceCompaniesRoutes from '@/router/InsuranceCompaniesRoutes';
import PatientsRoutes from '@/router/PatientsRoutes';
import RegisterExportsRoutes from '@/router/RegisterExportsRoutes';
import RegistersRoutes from '@/router/RegistersRoutes';
import RepresentativeRoutes from '@/router/RepresentativeRoutes';
import RepresentativeTypesRoutes from '@/router/RepresentativeTypesRoutes';
import UsersRoutes from '@/router/UsersRoutes';
import store from '@/store/index';

export const isAuthorized = (next: NavigationGuardNext): void => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    store.commit('auth/setIsAuth', true);
    store.commit('setLayout', 'main-layout');
    next();
  }
  store.commit('setLayout', 'login-layout');
  next('/login');
};

const routes: Array<RouteRecordRaw> = [
  ...AuthRoutes,
  ...DocumentsRoutes,
  ...DrugsRoutes,
  ...HistoryRoutes,
  ...InsuranceCompaniesRoutes,
  ...PatientsRoutes,
  ...RegisterExportsRoutes,
  ...RegistersRoutes,
  ...RegistersRoutes,
  ...RepresentativeRoutes,
  ...RepresentativeTypesRoutes,
  ...UsersRoutes,
  {
    path: '/mkb',
    name: 'Mkb',
    component: MkbList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/disabilities',
    name: 'Disabilities',
    component: DisabilitiesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

export default router;
