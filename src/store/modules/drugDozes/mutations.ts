import { MutationTree } from 'vuex';

import DrugDoze from '@/classes/DrugDoze';
import DrugNeeding from '@/classes/DrugNeeding';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DrugDoze, State>(DrugDoze),
  setDrugNeeding(state, item: DrugNeeding) {
    state.drugNeeding = new DrugNeeding(item);
  },
};

export default mutations;
