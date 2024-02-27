import { MutationTree } from 'vuex';

import DocumentFileInfo from '@/classes/DocumentFileInfo';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DocumentFileInfo, State>(DocumentFileInfo),
};

export default mutations;
