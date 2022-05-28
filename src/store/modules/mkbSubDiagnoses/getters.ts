import { GetterTree } from 'vuex';

import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IMkbSubDiagnosis[] {
    return state.items;
  },
  item(state): IMkbSubDiagnosis {
    return state.item;
  },
};

export default getters;
