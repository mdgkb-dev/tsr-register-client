import RegionPage from '@/components/Regions/RegionPage.vue';
import RegionsList from '@/components/Regions/RegionsList.vue';

export default [
  {
    path: '/regions',
    name: 'Regions',
    component: RegionsList,
  },
  {
    path: '/regions/new',
    name: 'CreateRegion',
    component: RegionPage,
  },
  {
    path: '/regions/:regionId',
    name: 'EditRegion',
    component: RegionPage,
  },
];
