import { Module } from 'vuex';

import PatientDiagnosis from '@/classes/PatientDiagnosis';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<PatientDiagnosis>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(PatientDiagnosis),
  };
};

const state = getDefaultState();

const namespaced = true;

export const patientsDiagnosis: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
