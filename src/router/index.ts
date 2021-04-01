import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import HomePage from '../components/HomePage.vue';
import HumansList from '../components/Humans/HumansList.vue';
import PatientsList from '../components/Patients/PatientsList.vue';
import RepresentativesList from '../components/Representatives/RepresentativesList.vue';
import DocumentsList from '../components/Documents/DocumentsList.vue';
import LoginForm from '../components/Login/LoginForm.vue';
import store from '../store';

const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
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
    redirect: '/home',
    beforeEnter: ifAuthenticated
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/humans',
    name: 'Humans',
    component: HumansList,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/patients',
    name: 'Patients',
    component: PatientsList,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/representatives',
    name: 'Representatives',
    component: RepresentativesList,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/documents',
    name: 'Documents',
    component: DocumentsList,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
    beforeEnter: ifNotAuthenticated
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
