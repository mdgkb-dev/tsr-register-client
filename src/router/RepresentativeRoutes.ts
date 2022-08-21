import RepresentativePage from '@/components/Representatives/RepresentativePage.vue';
import RepresentativesList from '@/components/Representatives/RepresentativesList.vue';

export default [
  {
    path: '/representatives',
    name: 'Representatives',
    component: RepresentativesList,
  },
  {
    path: '/representatives/new',
    name: 'CreateRepresentative',
    component: RepresentativePage,
  },
  {
    path: '/representatives/:representativeId',
    name: 'EditRepresentative',
    component: RepresentativePage,
  },
];
