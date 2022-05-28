import { GetterTree } from 'vuex';

import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IMkbDiagnosis[] {
    return state.items;
  },
  item(state): IMkbDiagnosis {
    return state.item;
  },
};

export default getters;
