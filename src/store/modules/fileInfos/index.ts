import { Module } from 'vuex';

import FileInfo from '@/classes/files/FileInfo';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<FileInfo>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(FileInfo),
  };
};

const state = getDefaultState();

const namespaced = true;

export const fileInfos: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
