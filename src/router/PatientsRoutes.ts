import PatientPage from '@/components/Patients/PatientPage.vue';
import PatientsList from '@/components/Patients/PatientsList.vue';
import { isAuthorized } from '@/router/index';

export default [
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
];
