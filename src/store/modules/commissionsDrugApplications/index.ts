import { Module } from 'vuex';

import CommissionDrugApplication from '@/classes/CommissionDrugApplication';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<CommissionDrugApplication>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(CommissionDrugApplication),
  };
};

const state = getDefaultState();

const namespaced = true;

export const commissionsDrugApplications: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
