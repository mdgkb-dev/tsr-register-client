import { MutationTree } from 'vuex';

import Representative from '@/classes/Representative';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Representative, State>(Representative),
};

export default mutations;
