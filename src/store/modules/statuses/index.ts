import { Module } from 'vuex';

import Status from '@/classes/Status';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Status>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Status),
  };
};

const state = getDefaultState();

const namespaced = true;

export const statuses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};