import UserPage from '@/components/Users/UserPage.vue';
import UsersList from '@/components/Users/UsersList.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/users',
    name: 'Users',
    component: UsersList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/users/new',
    name: 'CreateUser',
    component: UserPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/users/:userId',
    name: 'EditUser',
    component: UserPage,
    beforeEnter: isAuthorized,
  },
];
