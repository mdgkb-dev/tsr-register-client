import { MutationTree } from 'vuex';

import Question from '@/classes/Question';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Question, State>(Question),
};

export default mutations;
