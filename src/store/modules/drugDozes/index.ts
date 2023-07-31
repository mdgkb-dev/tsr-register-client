import { Module } from 'vuex';

import DrugDoze from '@/classes/DrugDoze';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DrugDoze>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DrugDoze),
  };
};

const state = getDefaultState();

const namespaced = true;

export const drugDozes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
