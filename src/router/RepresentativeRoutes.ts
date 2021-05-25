import { isAuthorized } from '@/router/index';
import RepresentativesList from '@/components/Representatives/RepresentativesList.vue';
import RepresentativePage from '@/components/Representatives/RepresentativePage.vue';

export default [
  {
    path: '/representatives',
    name: 'Representatives',
    component: RepresentativesList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/representatives/new',
    name: 'CreateRepresentative',
    component: RepresentativePage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/representatives/:representativeId',
    name: 'EditRepresentative',
    component: RepresentativePage,
    beforeEnter: isAuthorized,
  },
];
