import { MutationTree } from 'vuex';

import QuestionVariant from '@/classes/QuestionVariant';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<QuestionVariant, State>(QuestionVariant),
};

export default mutations;
