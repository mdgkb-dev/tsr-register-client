import AdminRepresentativePage from '@/components/admin/Representatives/AdminRepresentativePage.vue';
import AdminRepresentativesList from '@/components/admin/Representatives/AdminRepresentativesList.vue';

export default [
  {
    path: '/admin/representatives',
    name: 'AdminRepresentativesList',
    component: AdminRepresentativesList,
  },
  {
    path: '/admin/representatives/new',
    name: 'AdminNewRepresentativePage',
    component: AdminRepresentativePage,
  },
  {
    path: '/admin/representatives/:id',
    name: 'AdminEditRepresentativePage',
    component: AdminRepresentativePage,
  },
];
