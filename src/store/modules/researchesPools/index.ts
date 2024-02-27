import { Module } from 'vuex';

import ResearchesPool from '@/classes/ResearchesPool';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<ResearchesPool>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(ResearchesPool),
  };
};

const state = getDefaultState();

const namespaced = true;

export const researchesPools: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
