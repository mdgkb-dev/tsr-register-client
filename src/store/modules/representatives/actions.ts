import { ActionTree } from 'vuex';

import IRepresentative from '@/interfaces/representatives/IRepresentative';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('representatives');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, offset: number): Promise<void> => {
    if (offset || offset === 0) commit('setAll', await httpClient.get<IRepresentative>({ query: `?offset=${offset}` }));
    else commit('setAll', await httpClient.get<IRepresentative>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IRepresentative>({ query: id }));
  },
  create: async ({ commit }, representative: IRepresentative): Promise<void> => {
    representative.human.removeDocumentFieldValuesIds();
    commit(
      'create',
      await httpClient.post<IRepresentative, IRepresentative>({
        payload: representative,
        fileInfos: representative.getFileInfos(),
        isFormData: true,
      })
    );
  },
  edit: async ({ commit }, representative: IRepresentative): Promise<void> => {
    commit(
      'update',
      await httpClient.put<IRepresentative, IRepresentative>({
        payload: representative,
        query: representative.id,
        isFormData: true,
        fileInfos: representative.getFileInfos(),
      })
    );
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<IRepresentative, IRepresentative>({ query: id });
    commit('delete', id);
  },
  search: async ({ commit }, query: string): Promise<void> => {
    commit('setFilteredItems', await httpClient.get<IRepresentative[]>({ query: `?query=${query}` }));
  },
  getAllById: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IRepresentative[]>({ query: id });
    commit('setAll', [res]);
  },
};

export default actions;
