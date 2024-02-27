import { Module } from 'vuex';

import Human from '@/classes/Human';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Human>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Human),
  };
};

const state = getDefaultState();

const namespaced = true;

export const humans: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
