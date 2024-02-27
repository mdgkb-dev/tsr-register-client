import { Module } from 'vuex';

import Anamnesis from '@/classes/Anamnesis';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Anamnesis>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Anamnesis),
  };
};

const state = getDefaultState();

const namespaced = true;

export const anamneses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
