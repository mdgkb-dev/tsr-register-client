import { MutationTree } from 'vuex';

import PatientResearchesPool from '@/classes/PatientResearchesPool';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<PatientResearchesPool, State>(PatientResearchesPool),
};

export default mutations;
