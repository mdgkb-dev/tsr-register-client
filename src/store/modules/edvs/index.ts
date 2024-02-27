import { Module } from 'vuex';

import Edv from '@/classes/Edv';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Edv>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Edv),
  };
};

const state = getDefaultState();

const namespaced = true;

export const edvs: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
