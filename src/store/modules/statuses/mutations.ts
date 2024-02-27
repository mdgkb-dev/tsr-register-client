import { MutationTree } from 'vuex';

import Status from '@/classes/Status';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Status, State>(Status),
};

export default mutations;
