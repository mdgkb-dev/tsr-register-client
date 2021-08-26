import { Module } from 'vuex';

import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';
import User from '@/classes/user/User';

export const state: State = {
  users: [],
  user: new User(),
};

const namespaced = true;

export const users: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
