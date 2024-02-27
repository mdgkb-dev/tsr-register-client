import { MutationTree } from 'vuex';

import Drug from '@/classes/Drug';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Drug, State>(Drug),
};

export default mutations;
