import { Module } from 'vuex';

import { RootState } from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

import InsuranceCompany from '@/classes/insuranceCompanies/InsuranceCompany';

export const state: State = {
  insuranceCompanies: [],
  insuranceCompany: new InsuranceCompany(),
};

const namespaced = true;

export const insuranceCompanies: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
