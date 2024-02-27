import { MutationTree } from 'vuex';

import Human from '@/classes/Human';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Human, State>(Human),
};

export default mutations;
