import { Module } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import RootState from '@/store/types';

import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  trigger: 'click',
  storeModule: '',
  storeAction: 'getAll',
  filterQuery: new FilterQuery(),
};

const namespaced = true;

export const filter: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
};
