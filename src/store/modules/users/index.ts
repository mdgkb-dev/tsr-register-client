import { Module } from 'vuex';

import User from '@/classes/User';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<User>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(User),
  };
};
const state = getDefaultState();
const namespaced = true;

export const users: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
