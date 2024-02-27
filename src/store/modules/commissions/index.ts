import { Module } from 'vuex';

import Commission from '@/classes/Commission';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Commission>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Commission),
  };
};

const state = getDefaultState();

const namespaced = true;

export const commissions: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
