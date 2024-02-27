import { Module } from 'vuex';

import CommissionDoctor from '@/classes/CommissionDoctor';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<CommissionDoctor>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(CommissionDoctor),
  };
};

const state = getDefaultState();

const namespaced = true;

export const commissionsDoctors: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
