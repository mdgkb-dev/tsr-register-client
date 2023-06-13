import { Module } from 'vuex';

import DrugApplicationStatus from '@/classes/DrugApplicationStatus';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DrugApplicationStatus>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DrugApplicationStatus),
  };
};

const state = getDefaultState();

const namespaced = true;

export const drugApplicationsStatuses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
