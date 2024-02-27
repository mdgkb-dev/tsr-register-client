import { Module } from 'vuex';

import DrugArrive from '@/classes/DrugArrive';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DrugArrive>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DrugArrive),
  };
};

const state = getDefaultState();

const namespaced = true;

export const drugArrives: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
