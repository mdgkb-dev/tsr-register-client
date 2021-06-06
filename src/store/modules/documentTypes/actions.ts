import { ActionContext, ActionTree } from 'vuex';
import HttpClient from '@/services/HttpClient';
import State from './state';
import { RootState } from '@/store/types';
import IDocumentType from '@/interfaces/documents/IDocumentType';

const httpClient = new HttpClient('document-types');

const actions: ActionTree<State, RootState> = {
  create: async (_context: ActionContext<State, RootState>, documentType: IDocumentType): Promise<void> => {
    await httpClient.post({ payload: documentType });
  },
  get: async ({ commit }: ActionContext<State, RootState>, id: string): Promise<void> => {
    const documentType: IDocumentType = await httpClient.get(id);

    if (!documentType) {
      return;
    }

    commit('set', documentType);
  },
  getAll: async ({ commit }: ActionContext<State, RootState>): Promise<void> => {
    const documentTypes: IDocumentType[] = await httpClient.get();

    if (!documentTypes) {
      return;
    }

    commit('setAll', documentTypes);
  },
  edit: async (_context: ActionContext<State, RootState>, documentType: IDocumentType): Promise<void> => {
    await httpClient.put(documentType, documentType.id);
  },
  delete: async ({ commit }: ActionContext<State, RootState>, id: string): Promise<void> => {
    await httpClient.delete(id);
    commit('delete', id);
  }
}

export default actions;
