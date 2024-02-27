import { MutationTree } from 'vuex';

import CustomSection from '@/services/classes/page/CustomSection';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<CustomSection, State>(CustomSection),
};

export default mutations;
