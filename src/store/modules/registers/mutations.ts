import { MutationTree } from 'vuex';

import Register from '@/classes/Register';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Register, State>(Register),
};

export default mutations;
