import UserPage from '@/components/Users/UserPage.vue';
import UsersList from '@/components/Users/UsersList.vue';

export default [
  {
    path: '/users',
    name: 'Users',
    component: UsersList,
  },
  {
    path: '/users/new',
    name: 'CreateUser',
    component: UserPage,
  },
  {
    path: '/users/:userId',
    name: 'EditUser',
    component: UserPage,
  },
];
