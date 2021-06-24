import { isAuthorized } from '@/router/index';
import RegisterGroupList from '@/components/RegisterGroups/RegisterGroupList.vue';
import RegisterGroupPage from '@/components/RegisterGroups/RegisterGroupPage.vue';

export default [
  {
    path: '/register-groups',
    name: 'RegisterGroups',
    component: RegisterGroupList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/register-groups/new',
    name: 'CreateRegisterGroup',
    component: RegisterGroupPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/register-groups/:registerGroupId',
    name: 'EditRegisterGroup',
    component: RegisterGroupPage,
    beforeEnter: isAuthorized,
  },
];
