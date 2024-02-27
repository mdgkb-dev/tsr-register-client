import { GetterTree } from 'vuex';

import Human from '@/classes/Human';
import Patient from '@/classes/Patient';
import IAnthropomentry from '@/interfaces/IAnthropomentry';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Patient, State>(),
  getHuman(state): Human {
    return state.item.human;
  },
  setHuman(state, human: Human) {
    state.item.human = new Human(human);
  },
  existsInDomain(state): boolean {
    return state.existsInDomain;
  },
  actualAnthropometry(state): IAnthropomentry | undefined {
    return state.actualAnthropometry;
  },
};

export default getters;
