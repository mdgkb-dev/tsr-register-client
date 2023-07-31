import { MutationTree } from 'vuex';

import DrugDoze from '@/classes/DrugDoze';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DrugDoze, State>(DrugDoze),
};

export default mutations;
