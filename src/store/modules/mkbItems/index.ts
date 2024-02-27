import { Module } from 'vuex';

import MkbItem from '@/classes/MkbItem';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<MkbItem>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(MkbItem),
  };
};
const state = getDefaultState();

const namespaced = true;

export const mkbItems: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
