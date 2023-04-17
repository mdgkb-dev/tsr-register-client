import RegisterLinkList from '@/components/admin/Registers/RegisterLinkList.vue';
import RegisterList from '@/components/admin/Registers/RegisterList.vue';
import RegisterPage from '@/components/admin/Registers/RegisterPage.vue';
import RegisterPatientPage from '@/components/admin/Research/RegisterPatientPage.vue';
import RegisterPatientsPage from '@/components/admin/Research/RegisterPatientsPage.vue';

export default [
  {
    path: '/registers',
    name: 'Registers',
    component: RegisterList,
  },
  {
    path: '/registers/new',
    name: 'CreateRegister',
    component: RegisterPage,
  },
  {
    path: '/registers/:registerId',
    name: 'EditRegister',
    component: RegisterPage,
  },
  {
    path: '/registers/patients/:registerId/:patientId',
    name: 'RegisterPatient',
    component: RegisterPatientPage,
  },
  {
    path: '/registers/patients/:registerId',
    name: 'RegisterPatients',
    component: RegisterPatientsPage,
  },
  {
    path: '/register-link-list',
    name: 'RegisterLinkList',
    component: RegisterLinkList,
  },
];
