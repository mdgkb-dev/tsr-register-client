import { MutationTree } from 'vuex';

import HmfseScaleQuestion from '@/classes/HmfseScaleQuestion';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './state';

const mutations: MutationTree<State> = {
  ...getBaseMutations<HmfseScaleQuestion, State>(HmfseScaleQuestion),
};

export default mutations;
