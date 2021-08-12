import { ActionTree } from 'vuex';

import IRepresentative from '@/interfaces/representatives/IRepresentative';
import HttpClient from '@/services/HttpClient';
import { RootState } from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('representatives');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get({ query: id }));
  },
  create: async ({ commit }, representative: IRepresentative): Promise<void> => {
    representative.human.removeDocumentFieldValuesIds();
    commit('create', await httpClient.post({ payload: representative, fileInfos: representative.human.fileInfos, isFormData: true }));
  },
  edit: async ({ commit }, representative: IRepresentative): Promise<void> => {
    const fileInfos = representative.human.fileInfos.filter((info) => info.isDraft);
    commit(
      'update',
      await httpClient.put({
        payload: representative,
        query: representative.id,
        isFormData: true,
        fileInfos,
      })
    );
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete(id);
    commit('delete', id);
  },
};

export default actions;
