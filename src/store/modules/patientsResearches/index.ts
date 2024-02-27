import { Module } from 'vuex';

import PatientResearch from '@/classes/PatientResearch';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<PatientResearch>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(PatientResearch),
  };
};

const state = getDefaultState();

const namespaced = true;

export const patientsResearches: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
