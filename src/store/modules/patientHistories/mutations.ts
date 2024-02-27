import { MutationTree } from 'vuex';

import PatientHistory from '@/classes/PatientHistory';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<PatientHistory, State>(PatientHistory),
};

export default mutations;
