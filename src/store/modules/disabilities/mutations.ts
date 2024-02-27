import { MutationTree } from 'vuex';

import Disability from '@/classes/Disability';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Disability, State>(Disability),
};

export default mutations;
