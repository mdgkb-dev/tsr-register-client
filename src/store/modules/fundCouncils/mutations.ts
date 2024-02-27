import { MutationTree } from 'vuex';

import FundCouncil from '@/classes/FundCouncil';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<FundCouncil, State>(FundCouncil),
};

export default mutations;
