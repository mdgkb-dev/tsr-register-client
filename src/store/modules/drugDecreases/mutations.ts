import { MutationTree } from 'vuex';

import DrugDecrease from '@/classes/DrugDecrease';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DrugDecrease, State>(DrugDecrease),
};

export default mutations;
