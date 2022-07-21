import RegionList from '@/components/Regions/RegionList.vue';
import RegionPage from '@/components/Regions/RegionPage.vue';

export default [
  {
    path: '/regions',
    name: 'Regions',
    component: RegionList,
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
