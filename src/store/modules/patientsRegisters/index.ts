import { Module } from 'vuex';

import PatientRegister from '@/classes/PatientRegister';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<PatientRegister>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(PatientRegister),
  };
};

const state = getDefaultState();

const namespaced = true;

export const patientsRegisters: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
