import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import DisabilitiesList from '@/components/Disabilities/DisabilitiesList.vue';
import MkbList from '@/components/Mkb/MkbList.vue';
import AuthRoutes from '@/router/AuthRoutes';
import DocumentsRoutes from '@/router/DocumentsRoutes';
import DrugsRoutes from '@/router/DrugsRoutes';
import HistoryRoutes from '@/router/HistoryRoutes';
import InsuranceCompaniesRoutes from '@/router/InsuranceCompaniesRoutes';
import PatientsRoutes from '@/router/PatientsRoutes';
import RegionsRoutes from '@/router/RegionsRoutes';
import RegisterExportsRoutes from '@/router/RegisterExportsRoutes';
import RegistersRoutes from '@/router/RegistersRoutes';
import RepresentativeRoutes from '@/router/RepresentativeRoutes';
import RepresentativeTypesRoutes from '@/router/RepresentativeTypesRoutes';
import UsersRoutes from '@/router/UsersRoutes';
import TokenService from '@/services/Token';
import store from '@/store/index';

export const isAuthorized = (next: NavigationGuardNext): void => {
  const user = localStorage.getItem('user');
  if (user) {
    store.commit('auth/setIsAuth', true);
  }
  next();
};

export const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void => {
  if (to.fullPath !== '/login' && !TokenService.isAuth()) {
    router.push('/login');
  }
  next();
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
  ...RegionsRoutes,
  {
    path: '/mkb',
    name: 'Mkb',
    component: MkbList,
  },
  {
    path: '/disabilities',
    name: 'Disabilities',
    component: DisabilitiesList,
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

router.beforeEach(authGuard);

export default router;
