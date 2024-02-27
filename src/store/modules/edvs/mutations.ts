import { MutationTree } from 'vuex';

import Edv from '@/classes/Edv';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Edv, State>(Edv),
};

export default mutations;
