import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import HttpClient from '@/services/HttpClient';
import IPatient from '@/interfaces/patients/IPatient';
import { State } from './state';

const httpClient = new HttpClient('patients');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get(id));
  },
  create: async ({ commit }, payload: IPatient): Promise<void> => {
    commit('create', await httpClient.post(payload));
  },
  edit: async ({ commit }, payload: IPatient): Promise<void> => {
    commit('update', await httpClient.put(payload, payload.id));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    commit('delete', await httpClient.delete(id));
  },
};

export default actions;
