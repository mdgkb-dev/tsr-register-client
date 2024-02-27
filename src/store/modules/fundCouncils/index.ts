import { Module } from 'vuex';

import FundCouncil from '@/classes/FundCouncil';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<FundCouncil>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(FundCouncil),
  };
};

const state = getDefaultState();

const namespaced = true;

export const fundCouncils: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
