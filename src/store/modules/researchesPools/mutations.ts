import { MutationTree } from 'vuex';

import ResearchesPool from '@/classes/ResearchesPool';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<ResearchesPool, State>(ResearchesPool),
};

export default mutations;
