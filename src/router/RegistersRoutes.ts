import { isAuthorized } from '@/router/index';
import RegisterList from '@/components/Registers/RegisterList.vue';
import RegisterLinkList from '@/components/Registers/RegisterLinkList.vue';
import RegisterPage from '@/components/Registers/RegisterPage.vue';
import RegisterPatientsPage from '@/components/Registers/RegisterPatientsPage.vue';

export default [
  {
    path: '/registers',
    name: 'Registers',
    component: RegisterList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/registers/new',
    name: 'CreateRegister',
    component: RegisterPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/registers/:registerId',
    name: 'EditRegister',
    component: RegisterPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/registers/patients/:registerId/:registerName',
    name: 'RegisterPatients',
    component: RegisterPatientsPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/register-link-list',
    name: 'RegisterLinkList',
    component: RegisterLinkList,
    beforeEnter: isAuthorized,
  },
];
