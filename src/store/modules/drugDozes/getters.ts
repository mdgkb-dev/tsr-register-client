import { GetterTree } from 'vuex';

import DrugDoze from '@/classes/DrugDoze';
import DrugNeeding from '@/classes/DrugNeeding';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DrugDoze, State>(),
  drugNeeding(state): DrugNeeding {
    return state.drugNeeding;
  },
};

export default getters;
