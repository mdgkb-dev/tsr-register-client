import { MutationTree } from 'vuex';

import Patient from '@/classes/Patient';
import IAnthropomentry from '@/interfaces/IAnthropomentry';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

interface existsObject {
  existsInDomain: boolean;
  item: Patient | undefined;
}

const mutations: MutationTree<State> = {
  ...getBaseMutations<Patient, State>(Patient),
  setExists(state, data: existsObject) {
    state.existsInDomain = data.existsInDomain;
    state.item = new Patient(data.item);
  },
  setActualAnthropomentry(state, item: IAnthropomentry) {
    if (item.height && item.weight && item.date) {
      state.actualAnthropometry = item;
    }
  },
};

export default mutations;
