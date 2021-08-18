import RegisterLinkList from '@/components/Registers/RegisterLinkList.vue';
import RegisterList from '@/components/Registers/RegisterList.vue';
import RegisterPage from '@/components/Registers/RegisterPage.vue';
import RegisterPatientPage from '@/components/Registers/RegisterPatientPage.vue';
import RegisterPatientsPage from '@/components/Registers/RegisterPatientsPage.vue';
import { isAuthorized } from '@/router/index';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default [
  {
    path: '/registers',
    name: 'Registers',
    component: RegisterList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/registers/new',
    name: 'CreateRegister',
    component: RegisterPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/registers/:registerId',
    name: 'EditRegister',
    component: RegisterPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/registers/patients/:registerId/:patientId',
    name: 'RegisterPatient',
    component: RegisterPatientPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/registers/patients/:registerId',
    name: 'RegisterPatients',
    component: RegisterPatientsPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/register-link-list',
    name: 'RegisterLinkList',
    component: RegisterLinkList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
