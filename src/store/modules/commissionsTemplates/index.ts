import { Module } from 'vuex';

import CommissionTemplate from '@/classes/CommissionTemplate';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<CommissionTemplate>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(CommissionTemplate),
  };
};

const state = getDefaultState();

const namespaced = true;

export const commissionsTemplates: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
