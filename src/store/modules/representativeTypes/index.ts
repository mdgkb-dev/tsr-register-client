import { Module } from 'vuex';

import RepresentativeType from '@/classes/RepresentativeType';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<RepresentativeType>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(RepresentativeType),
  };
};
const state = getDefaultState();
const namespaced = true;

export const representativeTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
