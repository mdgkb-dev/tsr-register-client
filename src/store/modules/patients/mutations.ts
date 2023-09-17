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
    console.log(data);
    state.existsInDomain = data.existsInDomain;
    state.item = new Patient(data.item);
  },
};

export default mutations;
