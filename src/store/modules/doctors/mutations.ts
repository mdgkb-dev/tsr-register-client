import { MutationTree } from 'vuex';

import Doctor from '@/classes/Doctor';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Doctor, State>(Doctor),
};

export default mutations;
