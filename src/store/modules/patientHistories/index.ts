import { Module } from 'vuex';

import PatientHistory from '@/classes/PatientHistory';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<PatientHistory>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(PatientHistory),
  };
};

const state = getDefaultState();

const namespaced = true;

export const patientHistories: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
