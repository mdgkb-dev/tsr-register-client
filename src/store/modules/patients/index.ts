import { Module } from 'vuex';

import Patient from '@/classes/patients/Patient';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  patients: [],
  patientsHistory: [],
  patient: new Patient(),
  filteredPatients: [],
  photoFileList: [],
  count: 0,
  isEditMode: true,
};

const namespaced = true;

export const patients: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
