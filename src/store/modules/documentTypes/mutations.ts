import { MutationTree } from 'vuex';

import DocumentType from '@/classes/DocumentType';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DocumentType, State>(DocumentType),
};

export default mutations;
