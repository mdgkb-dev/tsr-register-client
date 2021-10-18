import { Module } from 'vuex';

import RegisterQuery from '@/classes/registers/RegisterQuery';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import State from './state';

export const state: State = {
  registerQuery: new RegisterQuery(),
  registerQueries: [],
  isAddPropertyDisabled: true,
};

const namespaced = true;

const registerQueries: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};

export default registerQueries;
