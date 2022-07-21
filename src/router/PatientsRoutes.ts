import PatientPage from '@/components/Patients/PatientPage.vue';
import PatientsHistoryList from '@/components/Patients/PatientsHistoryList.vue';
import PatientsList from '@/components/Patients/PatientsList.vue';
import PatientsDocumentsList from '@/components/PatientsDocumentsList/PatientsDocumentsList.vue';

export default [
  {
    path: '/patients',
    name: 'Patients',
    component: PatientsList,
  },
  {
    path: '/patients/documents-list',
    name: 'PatientsDocumentsList',
    component: PatientsDocumentsList,
  },
  {
    path: '/patients/new',
    name: 'CreatePatient',
    component: PatientPage,
  },
  {
    path: '/patients/history/:patientId',
    name: 'PatientsHistoryList',
    component: PatientsHistoryList,
  },
  {
    path: '/patients/history/:patientId/:patientHistoryId',
    name: 'PatientsHistoryPage',
    component: PatientPage,
  },
  {
    path: '/patients/:patientId',
    name: 'EditPatient',
    component: PatientPage,
  },
  {
    path: '/patients/:patientId/:mode',
    name: 'Patient',
    component: PatientPage,
  },
];
