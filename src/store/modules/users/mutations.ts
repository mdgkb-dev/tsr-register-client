import { MutationTree } from 'vuex';

import User from '@/classes/User';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<User, State>(User),
};

export default mutations;
