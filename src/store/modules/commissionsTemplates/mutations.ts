import { MutationTree } from 'vuex';

import CommissionTemplate from '@/classes/CommissionTemplate';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<CommissionTemplate, State>(CommissionTemplate),
};

export default mutations;
