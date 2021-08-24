import { GetterTree } from 'vuex';

import IDrug from '@/interfaces/drugs/IDrug';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  drugs(state): IDrug[] {
    return state.drugs;
  },
  drug(state): IDrug {
    return state.drug;
  },
  getById(state, id: string): IDrug | undefined {
    return state.drugs.find((item: IDrug) => item.id === id);
  },
};

export default getters;
