import { Module } from 'vuex';

import CustomSection from '@/services/classes/page/CustomSection';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<CustomSection>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(CustomSection),
  };
};

const state = getDefaultState();

const namespaced = true;

export const customSections: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
