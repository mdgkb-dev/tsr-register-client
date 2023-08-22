import { Module } from 'vuex';

import Menu from '@/services/classes/Menu';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Menu>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Menu),
  };
};

const state = getDefaultState();

const namespaced = true;

export const menus: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
