import { ActionTree } from 'vuex';

import IPatient from '@/interfaces/patients/IPatient';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('patients');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, pageNum?: number): Promise<void> => {
    if (pageNum !== undefined) {
      commit('setAll', await httpClient.get<IPatient[]>({ query: `?offset=${pageNum}` }));
    } else {
      commit('setAll', await httpClient.get<IPatient[]>());
    }
  },
  getCount: async ({ commit }): Promise<void> => {
    // TODO: Нет такой мутации 'setCount'. Лишний action?
    commit('setCount', await httpClient.get<number>({ query: `count` }));
  },
  getAllById: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IPatient[]>({ query: id });
    commit('setAll', [res]);
  },
  getAllWithDisabilities: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IPatient[]>({ query: '?withDisabilities=true' }));
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IPatient>({ query: id }));
  },
  create: async ({ commit }, patient: IPatient): Promise<void> => {
    patient.human.removeDocumentFieldValuesIds();
    commit('create', await httpClient.post<IPatient, IPatient>({ payload: patient, fileInfos: patient.getFileInfos(), isFormData: true }));
  },
  edit: async ({ commit }, patient: IPatient): Promise<void> => {
    commit(
      'update',
      await httpClient.put<IPatient, IPatient>({
        payload: patient,
        query: patient.id,
        isFormData: true,
        fileInfos: patient.getFileInfos(),
      })
    );
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<IPatient, IPatient>({ query: id });
    commit('delete', id);
  },
  searchPatients: async ({ commit }, query: string): Promise<void> => {
    commit('setFilteredPatients', await httpClient.get<IPatient[]>({ query: `?query=${query}` }));
  },
};

export default actions;
