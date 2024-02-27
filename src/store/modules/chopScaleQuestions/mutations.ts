import { MutationTree } from 'vuex';

import ChopScaleQuestion from '@/classes/ChopScaleQuestion';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './state';

const mutations: MutationTree<State> = {
  ...getBaseMutations<ChopScaleQuestion, State>(ChopScaleQuestion),
};

export default mutations;
