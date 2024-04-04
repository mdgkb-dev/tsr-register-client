import { Module } from 'vuex';

import AnswerVariant from '@/classes/AnswerVariant';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<AnswerVariant>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(AnswerVariant),
  };
};
const state = getDefaultState();
const namespaced = true;
export const answerVariants: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
