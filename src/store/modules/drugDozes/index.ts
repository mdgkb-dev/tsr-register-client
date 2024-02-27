import { Module } from 'vuex';

import DrugDoze from '@/classes/DrugDoze';
import DrugNeeding from '@/classes/DrugNeeding';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<DrugDoze> {
  drugNeeding: DrugNeeding;
}
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DrugDoze),
    drugNeeding: new DrugNeeding(),
  };
};

const state = getDefaultState();

const namespaced = true;

export const drugDozes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
