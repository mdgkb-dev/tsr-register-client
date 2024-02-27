import { Module } from 'vuex';

import DrugDecrease from '@/classes/DrugDecrease';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DrugDecrease>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DrugDecrease),
  };
};

const state = getDefaultState();

const namespaced = true;

export const drugDecreases: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
