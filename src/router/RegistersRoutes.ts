import { isAuthorized } from '@/router/index';
import RegisterList from '@/components/Registers/RegisterList.vue';
import RegisterPage from '@/components/Registers/RegisterPage.vue';

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
];
