import DrugPage from '@/components/Drugs/DrugPage.vue';
import DrugsList from '@/components/Drugs/DrugsList.vue';

export default [
  {
    path: '/drugs',
    name: 'DrugsList',
    component: DrugsList,
  },
  {
    path: '/drugs/new',
    name: 'CreateDrug',
    component: DrugPage,
  },
  {
    path: '/drugs/:drugId',
    name: 'EditDrug',
    component: DrugPage,
  },
];
