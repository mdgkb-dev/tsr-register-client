import { MutationTree } from 'vuex';

import DrugArrive from '@/classes/DrugArrive';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DrugArrive, State>(DrugArrive),
};

export default mutations;
