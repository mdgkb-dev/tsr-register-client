import { ActionTree } from 'vuex';

import IPatient from '@/interfaces/patients/IPatient';
import HttpClient from '@/services/HttpClient';
import { RootState } from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('patients');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, pageNum?: number): Promise<void> => {
    if (pageNum) {
      commit('setAll', await httpClient.get({ query: `?offset=${pageNum}` }));
    } else {
      commit('setAll', await httpClient.get());
    }
  },
  getAllWithDisabilities: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get({ query: '?withDisabilities=true' }));
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get({ query: id }));
  },
  create: async ({ commit }, patient: IPatient): Promise<void> => {
    patient.human.removeDocumentFieldValuesIds();
    commit('create', await httpClient.post({ payload: patient, fileInfos: patient.human.fileInfos, isFormData: true }));
  },
  edit: async ({ commit }, patient: IPatient): Promise<void> => {
    const fileInfos = patient.human.fileInfos.filter((info) => info.isDraft);
    commit(
      'update',
      await httpClient.put({
        payload: patient,
        query: patient.id,
        isFormData: true,
        fileInfos,
      }),
    );
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete(id);
    commit('delete', id);
  },
};

export default actions;
