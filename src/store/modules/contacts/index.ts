import { Module } from 'vuex';

import Contact from '@/classes/humans/Contact';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Contact>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Contact),
  };
};

const state = getDefaultState();

const namespaced = true;

export const contacts: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
