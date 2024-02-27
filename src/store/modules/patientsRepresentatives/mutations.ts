import { MutationTree } from 'vuex';

import PatientRepresentative from '@/classes/PatientRepresentative';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<PatientRepresentative, State>(PatientRepresentative),
};

export default mutations;
