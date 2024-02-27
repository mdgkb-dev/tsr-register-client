import { MutationTree } from 'vuex';

import Research from '@/classes/Research';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Research, State>(Research),
};

export default mutations;
