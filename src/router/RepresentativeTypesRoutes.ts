import RepresentativeTypePage from '@/components/RepresentativeTypes/RepresentativeTypePage.vue';
import RepresentativeTypesList from '@/components/RepresentativeTypes/RepresentativeTypesList.vue';

export default [
  {
    path: '/representative-types',
    name: 'RepresentativeTypes',
    component: RepresentativeTypesList,
  },
  {
    path: '/representative-types/new',
    name: 'CreateRepresentativeType',
    component: RepresentativeTypePage,
  },
  {
    path: '/representative-types/:representativeTypeId',
    name: 'EditRepresentativeType',
    component: RepresentativeTypePage,
  },
];
