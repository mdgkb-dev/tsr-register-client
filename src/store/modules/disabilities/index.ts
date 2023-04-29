import { Module } from 'vuex';

import RootState from '@/store/types';

import Disability from '@/classes/Disability';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import IBasicState from '@/store/baseModule/baseState';
import getBaseDefaultState from '@/store/baseModule/baseIndex';

export type State = IBasicState<Disability>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Disability),
  };
};

const state = getDefaultState();

const namespaced = true;

export const disabilities: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
