import { Module } from 'vuex';

import Disability from '@/classes/Disability';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

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
