import { MutationTree } from 'vuex';

import FTSPSaveQuery from '@/services/classes/FTSPSaveQuery';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<FTSPSaveQuery, State>(FTSPSaveQuery),
};

export default mutations;
