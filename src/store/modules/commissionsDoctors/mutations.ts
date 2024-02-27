import { MutationTree } from 'vuex';

import CommissionDoctor from '@/classes/CommissionDoctor';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<CommissionDoctor, State>(CommissionDoctor),
};

export default mutations;
