import { MutationTree } from 'vuex';

import Contact from '@/classes/humans/Contact';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Contact, State>(Contact),
};

export default mutations;
