import { cloneDeep } from 'lodash';
import { GetterTree } from 'vuex';

import Human from '@/classes/Human';
import Patient from '@/classes/Patient';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Patient, State>(),
  getHuman(state): Human {
    return state.item.human;
  },
  setHuman(state, human: Human) {
    state.item.human = cloneDeep(human);
  },
};

export default getters;
