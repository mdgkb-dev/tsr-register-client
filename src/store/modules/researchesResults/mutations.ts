import { MutationTree } from 'vuex';

import ResearchResult from '@/classes/ResearchResult';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<ResearchResult, State>(ResearchResult),
};

export default mutations;
