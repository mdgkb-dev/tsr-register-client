import Cookies from 'js-cookie';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import DisabilitiesList from '@/components/Disabilities/DisabilitiesList.vue';
import MkbList from '@/components/Mkb/MkbList.vue';
import AnthropometriesRoutes from '@/router/AnthropometriesRoutes';
import AuthRoutes from '@/router/AuthRoutes';
import DocumentsRoutes from '@/router/DocumentsRoutes';
import InsuranceCompaniesRoutes from '@/router/InsuranceCompaniesRoutes';
import PatientsRoutes from '@/router/PatientsRoutes';
import RepresentativeRoutes from '@/router/RepresentativeRoutes';
import RepresentativeTypesRoutes from '@/router/RepresentativeTypesRoutes';
import UsersRoutes from '@/router/UsersRoutes';

import store from '../store/index';
import RegisterGroupsRoutes from './RegisterGroupsRoutes';
import RegisterPropertiesRoutes from './RegisterPropertiesRoutes';
import RegistersRoutes from './RegistersRoutes';

export const isAuthorized = async (to: any, from: any, next: any) => {
  let response;

  try {
    response = await fetch(`${process.env.VUE_APP_BASE_URL}login`);
  } catch (error) {
    Cookies.remove('user_sid');
    window.localStorage.removeItem('user_sid');
    store.commit('setLayout', 'login-layout');
    next('/login');
    return;
  }
  if (response.status === 200 || response.status === 304) {
    const cookie = Cookies.get('user_sid');
    window.localStorage.setItem('user_sid', String(cookie));
    next();
    return;
  }
  Cookies.remove('user_sid');
  window.localStorage.removeItem('user_sid');
  store.commit('setLayout', 'login-layout');
  next('/login');
  next();
};

export const isNotAuthorized = async (to: any, from: any, next: any) => {
  let response;
  try {
    response = await fetch(`${process.env.VUE_APP_BASE_URL}login`);
  } catch (error) {
    Cookies.remove('user_sid');
    window.localStorage.removeItem('user_sid');
    next();
    return;
  }

  if (response.status === 200 || response.status === 304) {
    const cookie = Cookies.get('user_sid');
    window.localStorage.setItem('user_sid', String(cookie));
    next('/patients');
    return;
  }
  Cookies.remove('user_sid');
  window.localStorage.removeItem('user_sid');
  next();
};

const routes: Array<RouteRecordRaw> = [
  ...PatientsRoutes,
  ...AuthRoutes,
  ...RepresentativeRoutes,
  ...InsuranceCompaniesRoutes,
  ...RepresentativeTypesRoutes,
  ...DocumentsRoutes,
  ...AnthropometriesRoutes,
  ...UsersRoutes,
  ...RegistersRoutes,
  ...RegisterGroupsRoutes,
  ...RegisterPropertiesRoutes,
  {
    path: '/mkb',
    name: 'Mkb',
    component: MkbList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/disabilities',
    name: 'Disabilities',
    component: DisabilitiesList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory('tsr'),
  routes,
});

export default router;
