import { Module } from 'vuex';

import PatientRepresentative from '@/classes/PatientRepresentative';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<PatientRepresentative>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(PatientRepresentative),
  };
};

const state = getDefaultState();

const namespaced = true;

export const patientsRepresentatives: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
