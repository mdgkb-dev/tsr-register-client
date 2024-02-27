import { Module } from 'vuex';

import DrugForm from '@/classes/DrugForm';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DrugForm>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DrugForm),
  };
};

const state = getDefaultState();

const namespaced = true;

export const drugForms: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
