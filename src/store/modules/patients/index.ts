import { Module } from 'vuex';

import Patient from '@/classes/Patient';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Patient>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Patient),
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
