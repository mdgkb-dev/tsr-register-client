import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import PatientPage from '@/components/Patients/PatientPage.vue';
import PatientsHistoryList from '@/components/Patients/PatientsHistoryList.vue';
import PatientsList from '@/components/Patients/PatientsList.vue';
import PatientsDocumentsList from '@/components/PatientsDocumentsList/PatientsDocumentsList.vue';
import { isAuthorized } from '@/router/index';

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
    path: '/patients/documents-list',
    name: 'PatientsDocumentsList',
    component: PatientsDocumentsList,
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
    path: '/patients/history/:patientId',
    name: 'PatientsHistoryList',
    component: PatientsHistoryList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/patients/history/:patientId/:patientHistoryId',
    name: 'PatientsHistoryPage',
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
  {
    path: '/patients/:patientId/:mode',
    name: 'Patient',
    component: PatientPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
