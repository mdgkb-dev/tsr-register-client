import RepresentativeTypePage from '@/components/RepresentativeTypes/RepresentativeTypePage.vue';
import RepresentativeTypesList from '@/components/RepresentativeTypes/RepresentativeTypesList.vue';
import { isAuthorized } from '@/router/index';

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
    path: '/representative-types/:representativeTypeId',
    name: 'EditRepresentativeType',
    component: RepresentativeTypePage,
    beforeEnter: isAuthorized,
  },
];
