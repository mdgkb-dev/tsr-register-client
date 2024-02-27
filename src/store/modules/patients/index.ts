import { Module } from 'vuex';

import Patient from '@/classes/Patient';
import IAnthropomentry from '@/interfaces/IAnthropomentry';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<Patient> {
  existsInDomain: boolean;
  actualAnthropometry?: IAnthropomentry;
}

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Patient),
    existsInDomain: false,
    actualAnthropometry: undefined,
  };
};

const state = getDefaultState();
const namespaced = true;
export const patients: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
