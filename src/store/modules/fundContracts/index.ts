import { Module } from 'vuex';

import FundContract from '@/classes/FundContract';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<FundContract>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(FundContract),
  };
};

const state = getDefaultState();

const namespaced = true;

export const fundContracts: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
