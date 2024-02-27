import { Module } from 'vuex';

import Question from '@/classes/Question';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Question>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Question),
  };
};

const state = getDefaultState();
const namespaced = true;
export const questions: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
