import { Module } from 'vuex';

import RegisterProperty from '@/classes/registers/RegisterProperty';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  registerProperties: [],
  valueTypes: [],
  registerProperty: new RegisterProperty(),
};

const namespaced = true;

export const registerProperties: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
