import HttpClient from '@/services/HttpClient';
import IDocumentType from '@/interfaces/documents/IDocumentType';

const httpClient = new HttpClient('document-types');

export default {
  namespaced: true,
  state: {
    documentTypes: [],
  },
  getters: {
    documentTypes: (state: any): void => state.documentTypes,
  },
  mutations: {
    setAll: (state: any, documentTypes: IDocumentType[]) => {
      state.documentTypes = [...documentTypes];
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      const documentTypes: IDocumentType[] = await httpClient.get();
      context.commit('setAll', documentTypes);
    }
  },
}
