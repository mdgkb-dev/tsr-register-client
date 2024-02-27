import { MutationTree } from 'vuex';

import RepresentativeType from '@/classes/RepresentativeType';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<RepresentativeType, State>(RepresentativeType),
};

export default mutations;
