import { Module } from 'vuex';

import PatientResearchesPool from '@/classes/PatientResearchesPool';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<PatientResearchesPool>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(PatientResearchesPool),
  };
};

const state = getDefaultState();

const namespaced = true;

export const patientsResearchesPools: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
