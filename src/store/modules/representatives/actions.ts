import { ActionTree } from 'vuex';

import IRepresentative from '@/interfaces/representatives/IRepresentative';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('representatives');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, offset: number): Promise<void> => {
    if (offset || offset === 0) commit('setAll', await httpClient.get({ query: `?offset=${offset}` }));
    else commit('setAll', await httpClient.get());
  },
  getCount: async ({ commit }): Promise<void> => {
    commit('setCount', await httpClient.get({ query: `count` }));
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
  search: async ({ commit }, query: string): Promise<void> => {
    commit('setFilteredItems', await httpClient.get({ query: `?query=${query}` }));
  },
  getAllById: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get({ query: id });
    commit('setAll', [res]);
  },
};

export default actions;
