import HistoryList from '@/components/History/HistoryList.vue';
import HistoryPatientsList from '@/components/History/HistoryPatientsList.vue';

export default [
  {
    path: '/history',
    name: 'HistoryList',
    component: HistoryList,
  },
  {
    path: '/history/patients',
    name: 'HistoryPatientsList',
    component: HistoryPatientsList,
  },
];
