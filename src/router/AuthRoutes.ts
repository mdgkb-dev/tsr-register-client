import LoginPage from '@/components/Authorization/LoginPage.vue';
import RegistrationPage from '@/components/Authorization/RegistrationPage.vue';
import HomePage from '@/components/HomePage.vue';

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
  },
];
