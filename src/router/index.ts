import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Cookies from 'js-cookie';

import HomePage from '../components/HomePage.vue';
import PatientsList from '../components/Patients/PatientsList.vue';
import PatientPage from '../components/Patients/PatientPage.vue';
import RepresentativesList from '../components/Representatives/RepresentativesList.vue';
import RepresentativePage from '../components/Representatives/RepresentativePage.vue';
import DocumentsList from '../components/Documents/DocumentsList.vue';
import LoginPage from '../components/Authorization/LoginPage.vue';
import RegistrationPage from '../components/Authorization/RegistrationPage.vue';
import store from '../store';
import InsuranceCompaniesList from '@/components/InsuranceCompanies/InsuranceCompaniesList.vue';
import AnthropometryList from '@/components/Anthropometry/AnthropometryList.vue';
import MkbList from '@/components/Mkb/MkbList.vue';
import DocumentPage from '@/components/Documents/DocumentPage.vue';

const isAuthorized = async (to: any, from: any, next: any) => {
  let response;

  try {
    response = await fetch(process.env.VUE_APP_BASE_URL + 'login');
  } catch (error) {
    Cookies.remove('user_sid');
    window.localStorage.removeItem('user_sid');
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
  next('/login');
  next();
};

const isNotAuthorized = async (to: any, from: any, next: any) => {
  let response;
  try {
    response = await fetch(process.env.VUE_APP_BASE_URL + 'login');
  } catch (error) {
    Cookies.remove('user_sid');
    window.localStorage.removeItem('user_sid');
    next();
    return;
  }

  if (response.status === 200 || response.status === 304) {
    const cookie = Cookies.get('user_sid');
    window.localStorage.setItem('user_sid', String(cookie));
    next(`/patients`);
    return;
  }
  Cookies.remove('user_sid');
  window.localStorage.removeItem('user_sid');
  next();
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    beforeEnter: isNotAuthorized,
  },
  {
    path: '/register',
    name: 'RegistrationPage',
    component: RegistrationPage,
    beforeEnter: isNotAuthorized,
  },
  {
    path: '/',
    redirect: '/patients',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/patients',
    name: 'Patients',
    component: PatientsList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/patients/new',
    name: 'CreatePatient',
    component: PatientPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/patients/:patientId',
    name: 'EditPatient',
    component: PatientPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/representatives',
    name: 'Representatives',
    component: RepresentativesList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/representatives/new',
    name: 'CreateRepresentative',
    component: RepresentativePage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/representatives/:representativeId',
    name: 'EditRepresentative',
    component: RepresentativePage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/documents',
    name: 'Documents',
    component: DocumentsList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/documents/new',
    name: 'CreateDocument',
    component: DocumentPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/documents/:documentId',
    name: 'EditDocument',
    component: DocumentPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/insurance-companies',
    name: 'InsuranceCompanies',
    component: InsuranceCompaniesList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/anthropometry',
    name: 'Anthropometry',
    component: AnthropometryList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/mkb',
    name: 'Mkb',
    component: MkbList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: `/login`,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
