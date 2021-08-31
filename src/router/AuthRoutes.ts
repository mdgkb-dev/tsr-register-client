import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import LoginPage from '@/components/Authorization/LoginPage.vue';
import RegistrationPage from '@/components/Authorization/RegistrationPage.vue';
import HomePage from '@/components/HomePage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'RegistrationPage',
    component: RegistrationPage,
  },
  {
    path: '/',
    redirect: '/patients',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
