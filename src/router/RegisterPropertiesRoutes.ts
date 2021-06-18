import { isAuthorized } from '@/router/index';
import RegisterPropertyList from '@/components/RegisterProperties/RegisterPropertyList.vue';
import RegisterPropertyPage from '@/components/RegisterProperties/RegisterPropertyPage.vue';

export default [
  {
    path: '/register-properties',
    name: 'RegisterProperties',
    component: RegisterPropertyList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/register-properties/new',
    name: 'CreateRegisterProperty',
    component: RegisterPropertyPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/register-properties/:registerPropertyId',
    name: 'EditRegisterProperty',
    component: RegisterPropertyPage,
    beforeEnter: isAuthorized,
  },
];
