import { Module } from 'vuex';

import Representative from '@/classes/representatives/Representative';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  representatives: [],
  representative: new Representative(),
  filteredRepresentatives: [],
  photoFileList: [],
  count: 0,
  isEditMode: true,
  lastInsertedId: undefined,
};

const namespaced = true;

export const representatives: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
