import { ActionContext, ActionTree } from 'vuex';

import IDocumentType from '@/interfaces/documents/IDocumentType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('document-types');

const actions: ActionTree<State, RootState> = {
  create: async (_context: ActionContext<State, RootState>, documentType: IDocumentType): Promise<void> => {
    await httpClient.post<IDocumentType, IDocumentType>({ payload: documentType });
  },
  get: async ({ commit }: ActionContext<State, RootState>, id: string): Promise<void> => {
    const documentType: IDocumentType = await httpClient.get<IDocumentType>({ query: id });

    if (!documentType) {
      return;
    }

    commit('set', documentType);
  },
  getAll: async ({ commit }: ActionContext<State, RootState>): Promise<void> => {
    const documentTypes: IDocumentType[] = await httpClient.get<IDocumentType[]>();

    if (!documentTypes) {
      return;
    }

    commit('setAll', documentTypes);
  },
  edit: async (_context: ActionContext<State, RootState>, documentType: IDocumentType): Promise<void> => {
    await httpClient.put<IDocumentType, IDocumentType>({ payload: documentType, query: documentType.id });
  },
  delete: async ({ commit }: ActionContext<State, RootState>, id: string): Promise<void> => {
    await httpClient.delete<IDocumentType, IDocumentType>({ query: id });
    commit('delete', id);
  },
};

export default actions;
