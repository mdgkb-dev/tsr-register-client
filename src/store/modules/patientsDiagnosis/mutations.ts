import { MutationTree } from 'vuex';

import PatientDiagnosis from '@/classes/PatientDiagnosis';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<PatientDiagnosis, State>(PatientDiagnosis),
};

export default mutations;
