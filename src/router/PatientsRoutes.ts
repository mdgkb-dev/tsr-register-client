import PatientPage from '@/components/Patients/PatientPage.vue';
import PatientsList from '@/components/Patients/PatientsList.vue';
import { isAuthorized } from '@/router/index';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default [
  {
    path: '/patients',
    name: 'Patients',
    component: PatientsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/patients/new',
    name: 'CreatePatient',
    component: PatientPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/patients/:patientId',
    name: 'EditPatient',
    component: PatientPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
