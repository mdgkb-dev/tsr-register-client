import { MutationTree } from 'vuex';

import PatientResearch from '@/classes/PatientResearch';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<PatientResearch, State>(PatientResearch),
};

export default mutations;
