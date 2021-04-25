import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomePage from '../components/HomePage.vue';
import PatientsList from '../components/Patients/PatientsList.vue';
import PatientPage from '../components/Patients/PatientPage.vue';
import RepresentativesList from '../components/Representatives/RepresentativesList.vue';
import RepresentativePage from '../components/Representatives/RepresentativePage.vue';
import DocumentsList from '../components/Documents/DocumentsList.vue';
import LoginForm from '../components/Login/LoginForm.vue';
import store from '../store';
import InsuranceCompaniesList from '@/components/InsuranceCompanies/InsuranceCompaniesList.vue';
import AnthropometryList from '@/components/Anthropometry/AnthropometryList.vue';
import MkbList from '@/components/Mkb/MkbList.vue';
import DocumentPage from '@/components/Documents/DocumentPage.vue';

const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/patients');
};

const ifAuthenticated = (to: any, from: any, next: any) => {
  if (localStorage.getItem('user-token')) {
    next();
    return;
  }
  store.commit('setLayout', 'login-layout');
  next('/login');
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/patients',
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/patients',
    name: 'Patients',
    component: PatientsList,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/patients/new',
    name: 'CreatePatient',
    component: PatientPage,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/patients/:patientId',
    name: 'EditPatient',
    component: PatientPage,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/representatives',
    name: 'Representatives',
    component: RepresentativesList,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/representatives/new',
    name: 'CreateRepresentative',
    component: RepresentativePage,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/representatives/:representativeId',
    name: 'EditRepresentative',
    component: RepresentativePage,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/documents',
    name: 'Documents',
    component: DocumentsList,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/documents/new',
    name: 'CreateDocument',
    component: DocumentPage,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/documents/:documentId',
    name: 'EditDocument',
    component: DocumentPage,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/insurance-companies',
    name: 'InsuranceCompanies',
    component: InsuranceCompaniesList,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/anthropometry',
    name: 'Anthropometry',
    component: AnthropometryList,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/mkb',
    name: 'Mkb',
    component: MkbList,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
    beforeEnter: ifNotAuthenticated,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
