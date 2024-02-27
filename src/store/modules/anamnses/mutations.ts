import { MutationTree } from 'vuex';

import Anamnesis from '@/classes/Anamnesis';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Anamnesis, State>(Anamnesis),
};

export default mutations;
