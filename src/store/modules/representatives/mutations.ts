import { MutationTree } from 'vuex';

import Representative from '@/classes/Representative';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

interface existsObject {
  existsInDomain: boolean;
  item: Representative | undefined;
}

const mutations: MutationTree<State> = {
  ...getBaseMutations<Representative, State>(Representative),
  setExists(state, data: existsObject) {
    state.existsInDomain = data.existsInDomain;
    state.item = new Representative(data.item);
  },
};

export default mutations;
