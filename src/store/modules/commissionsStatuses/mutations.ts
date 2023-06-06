import { MutationTree } from 'vuex';

import CommissionStatus from '@/classes/CommissionStatus';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<CommissionStatus, State>(CommissionStatus),
};

export default mutations;
