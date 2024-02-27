import { MutationTree } from 'vuex';

import DrugApplication from '@/classes/DrugApplication';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DrugApplication, State>(DrugApplication),
};

export default mutations;
