import { MutationTree } from 'vuex';

import DrugApplicationStatus from '@/classes/DrugApplicationStatus';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DrugApplicationStatus, State>(DrugApplicationStatus),
};

export default mutations;
