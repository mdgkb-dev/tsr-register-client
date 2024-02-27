import { Module } from 'vuex';

import ResearchResult from '@/classes/ResearchResult';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<ResearchResult>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(ResearchResult),
  };
};

const state = getDefaultState();

const namespaced = true;

export const researchesResults: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
