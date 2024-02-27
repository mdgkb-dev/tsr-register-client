import { Module } from 'vuex';

import DrugRecipe from '@/classes/DrugRecipe';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DrugRecipe>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DrugRecipe),
  };
};

const state = getDefaultState();

const namespaced = true;

export const drugRecipes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
