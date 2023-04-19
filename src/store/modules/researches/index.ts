import { Module } from 'vuex';

import Research from '@/classes/Research';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Research>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Research),
  };
};

const state = getDefaultState();

const namespaced = true;

export const researches: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};