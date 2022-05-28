import { GetterTree } from 'vuex';

import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IMkbConcreteDiagnosis[] {
    return state.items;
  },
  item(state): IMkbConcreteDiagnosis {
    return state.item;
  },
};

export default getters;
