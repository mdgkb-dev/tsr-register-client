import { Module } from 'vuex';

import HmfseScaleQuestion from '@/classes/HmfseScaleQuestion';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state = (): State => {
  return {
    ...getBaseDefaultState(HmfseScaleQuestion),
  };
};

const namespaced = true;

export const hmfseScaleQuestions: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
