import { Module } from 'vuex';

import FTSPSaveQuery from '@/services/classes/FTSPSaveQuery';
import RootState from '@/services/interfaces/types';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<FTSPSaveQuery>;

export const state = (): State => {
  return {
    ...getBaseDefaultState(FTSPSaveQuery),
  };
};

const namespaced = true;

export const ftsp: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
