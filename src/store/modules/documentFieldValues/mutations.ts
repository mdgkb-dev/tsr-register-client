import { MutationTree } from 'vuex';

import DocumentFieldValue from '@/classes/DocumentFieldValue';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DocumentFieldValue, State>(DocumentFieldValue),
};

export default mutations;
