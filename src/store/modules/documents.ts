import HttpClient from '@/services/HttpClient';

const httpClient = new HttpClient('document');

export default {
  namespaced: true,
  state: {
    documents: [],
  },
  getters: {
    getPatientsNames: (state: any): void => {
      return state.documents;
    },
    documents: (state: any): void => {
      return state.documents;
    },
    getById: (state: any) => (id: number): void => {
      return state.documents.find((human: any) => human.id === id);
    },
  },
  mutations: {
    set: (state: any, payload: any): void => {
      state.documents = payload;
    },
    create: (state: any, payload: any): void => {
      state.documents.push(payload);
    },
    update: (state: any, payload: any): void => {
      const item = state.documents.find((item: any) => item.id === payload.id);
      Object.assign(item, payload);
    },
    delete: (state: any, payload: any): void => {
      const i = state.documents.findIndex((item: any) => item.id == payload);
      state.documents.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any) => {
      context.commit('set', await httpClient.get());
    },
    create: async (context: any, payload: any) => {
      context.commit('create', await httpClient.post(payload));
    },
    edit: async (context: any, payload: any) => {
      context.commit('update', await httpClient.put(payload, payload.id));
    },
    delete: async (context: any, id: string) => {
      context.commit('delete', await httpClient.delete(id));
    },

    upload: async (context: any, payload: any): Promise<Response> => {
      const formData = new FormData();
      formData.append('file', payload.file);
      return await fetch(process.env.VUE_APP_BASE_URL + `${httpClient.api}/upload`, {
        method: 'POST',
        body: formData,
      });
    },

    download: async (context: any, filePath: string): Promise<void> => {
      const res = await fetch(
        process.env.VUE_APP_BASE_URL + `${httpClient.api}/download/${filePath}`,
        {
          method: 'GET',
        }
      );
      const fileURL = window.URL.createObjectURL(new Blob([await res.blob()]));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'file.pdf');
      document.body.appendChild(fileLink);
      fileLink.click();
      return;
    },
  },
};
