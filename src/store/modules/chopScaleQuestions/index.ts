import { Module } from 'vuex';

import ChopScaleQuestion from '@/classes/ChopScaleQuestion';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state = (): State => {
  return {
    ...getBaseDefaultState(ChopScaleQuestion),
  };
};

const namespaced = true;

export const chopScaleQuestions: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
