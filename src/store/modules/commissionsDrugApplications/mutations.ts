import { MutationTree } from 'vuex';

import CommissionDrugApplication from '@/classes/CommissionDrugApplication';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<CommissionDrugApplication, State>(CommissionDrugApplication),
};

export default mutations;
