import { MutationTree } from 'vuex';

import PatientRegister from '@/classes/PatientRegister';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<PatientRegister, State>(PatientRegister),
};

export default mutations;
