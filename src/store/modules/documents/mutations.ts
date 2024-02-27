import { MutationTree } from 'vuex';

import Document from '@/classes/Document';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Document, State>(Document),
};

export default mutations;
