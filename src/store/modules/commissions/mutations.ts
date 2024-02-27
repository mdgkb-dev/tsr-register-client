import { MutationTree } from 'vuex';

import Commission from '@/classes/Commission';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Commission, State>(Commission),
};

export default mutations;
