import { isAuthorized } from '@/router/index';
import RepresentativeTypesList from '@/components/RepresentativeTypes/RepresentativeTypesList.vue';
import RepresentativeTypePage from '@/components/RepresentativeTypes/RepresentativeTypePage.vue';

export default [
  {
    path: '/representative-types',
    name: 'RepresentativeTypes',
    component: RepresentativeTypesList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/representative-types/new',
    name: 'CreateRepresentativeType',
    component: RepresentativeTypePage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/representative-types/:representativeId',
    name: 'EditRepresentativeType',
    component: RepresentativeTypePage,
    beforeEnter: isAuthorized,
  },
];
