import { MutationTree } from 'vuex';

import FundContract from '@/classes/FundContract';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<FundContract, State>(FundContract),
};

export default mutations;
