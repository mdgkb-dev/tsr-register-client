import { Module } from 'vuex';

import Register from '@/classes/Register';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Register>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Register),
  };
};

const state = getDefaultState();
const namespaced = true;
export const registers: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
