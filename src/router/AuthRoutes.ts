import { isAuthorized, isNotAuthorized } from '@/router/index';
import LoginPage from '@/components/Authorization/LoginPage.vue';
import RegistrationPage from '@/components/Authorization/RegistrationPage.vue';
import HomePage from '@/components/HomePage.vue';

export default [
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
];
