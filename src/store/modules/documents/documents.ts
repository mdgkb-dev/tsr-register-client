import Document from '@/classes/documents/Document';
import IDocument from '@/interfaces/documents/IDocument';
import HttpClient from '@/services/HttpClient';

const httpClient = new HttpClient('documents');

export default {
  namespaced: true,
  state: {
    documents: [],
    document: {},
  },
  getters: {
    getPatientsNames: (state: any): void => state.documents,
    documents: (state: any): void => state.documents,
    document: (state: any): void => state.document,
    getById: (state: any) => (id: number): void => state.documents.find((human: any) => human.id === id),
  },
  mutations: {
    setAll: (state: any, documents: IDocument[]) => {
      state.documents = documents.map((d: IDocument) => new Document(d));
    },
    set: (state: any, document: IDocument): void => {
      state.document = new Document(document);
      console.log('state.document', state.document);
    },
    create: (state: any, payload: any): void => {
      state.documents.push(payload);
    },
    update: (state: any, payload: any): void => {
      const item = state.documents.find((i: any) => i.id === payload.id);
      Object.assign(item, payload);
    },
    delete: (state: any, payload: any): void => {
      const i = state.documents.findIndex((item: any) => item.id === payload);
      state.documents.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      context.commit('setAll', await httpClient.get());
    },
    get: async (context: any, documentId: string) => {
      context.commit('set', await httpClient.get(documentId));
    },
    create: async (context: any, payload: IDocument): Promise<void> => {
      context.commit('create', await httpClient.post(payload));
    },
    edit: async (context: any, payload: IDocument): Promise<void> => {
      context.commit('update', await httpClient.put(payload, payload.id));
    },
    delete: async (context: any, id: string): Promise<void> => {
      context.commit('delete', await httpClient.delete(id));
    },

    upload: async (context: any, payload: any): Promise<Response> => {
      const formData = new FormData();
      formData.append('file', payload.file);
      return fetch(`${process.env.VUE_APP_BASE_URL}${httpClient.api}/upload`, {
        method: 'POST',
        body: formData,
      });
    },

    download: async (context: any, filePath: string): Promise<void> => {
      const res = await fetch(`${process.env.VUE_APP_BASE_URL}${httpClient.api}/download/${filePath}`, {
        method: 'GET',
      });
      const fileURL = window.URL.createObjectURL(new Blob([await res.blob()]));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'file.pdf');
      document.body.appendChild(fileLink);
      fileLink.click();
    },
  },
};
