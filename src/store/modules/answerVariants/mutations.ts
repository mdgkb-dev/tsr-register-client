import { MutationTree } from 'vuex';

import AnswerVariant from '@/classes/AnswerVariant';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<AnswerVariant, State>(AnswerVariant),
};

export default mutations;
