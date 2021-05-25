import { isAuthorized } from '@/router/index';
import UsersList from '@/components/Users/UsersList.vue';
import UserPage from '@/components/Users/UserPage.vue';

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
