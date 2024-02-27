import { Module } from 'vuex';

import DrugApplication from '@/classes/DrugApplication';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DrugApplication>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DrugApplication),
  };
};

const state = getDefaultState();

const namespaced = true;

export const drugApplications: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
