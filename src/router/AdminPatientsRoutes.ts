import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminPatientPage from '@/components/admin/Patients/AdminPatientPage.vue';
import AdminPatientsList from '@/components/admin/Patients/AdminPatientsList.vue';
import PatientsHistoryList from '@/components/admin/Patients/PatientsHistoryList.vue';
import { authGuard, isAuthorized } from '@/router/index';
// import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/patients',
    name: 'AdminPatientsList',
    component: AdminPatientsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },

  {
    path: '/admin/patients/new',
    name: 'AdminNewPatientPage',
    component: AdminPatientPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
  {
    path: '/admin/patients/history/:patientId',
    name: 'PatientsHistoryList',
    component: PatientsHistoryList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
  {
    path: '/admin/patients/history/:patientId/:patientHistoryId',
    name: 'PatientsHistoryPage',
    component: AdminPatientPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
  {
    path: '/admin/patients/:id',
    name: 'AdminEditPatientPage',
    component: AdminPatientPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
  },
  // {
  //   path: '/admin/patients/:id/:mode',
  //   name: 'Patient',
  //   component: AdminPatientPage,
  //   beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
  //     isAuthorized(next);
  //   },
  // },
];
