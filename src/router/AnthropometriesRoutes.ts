import AnthropometryList from '@/components/Anthropometry/AnthropometryList.vue';
import AnthropometryPage from '@/components/Anthropometry/AnthropometryPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/anthropometry',
    name: 'Anthropometry',
    component: AnthropometryList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/anthropometry/new',
    name: 'CreateAnthropometry',
    component: AnthropometryPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/anthropometry/:anthropometryId',
    name: 'EditAnthropometry',
    component: AnthropometryPage,
    beforeEnter: isAuthorized,
  },
];
