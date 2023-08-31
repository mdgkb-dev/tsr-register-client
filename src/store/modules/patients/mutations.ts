import { MutationTree } from 'vuex';

import Patient from '@/classes/Patient';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

interface existsObject {
  existsInDomain: boolean;
  item: Patient | undefined;
}

const mutations: MutationTree<State> = {
  ...getBaseMutations<Patient, State>(Patient),
  setExists(state, data: existsObject) {
    state.existsInDomain = data.existsInDomain;
    state.item = data.item ?? state.item;
  },
};

export default mutations;
