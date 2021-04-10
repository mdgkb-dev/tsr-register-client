const api = 'document-scan/';

export default {
  namespaced: true,
  state: {
    documentScans: [],
  },
  getters: {
    getPatientsNames: (state: any): void => {
      return state.documentScans;
    },
    documentScans: (state: any): void => {
      return state.documentScans;
    },
    getById: (state: any) => (id: number): void => {
      return state.documentScans.find((human: any) => human.id === id);
    },
  },
  mutations: {
    set: (state: any, payload: any): void => {
      state.documentScans = payload;
    },
    create: (state: any, payload: any): void => {
      state.documentScans.push(payload);
    },
    update: (state: any, payload: any): void => {
      const item = state.documentScans.find((item: any) => item.id === payload.recordId);
      Object.assign(item, payload);
    },
    delete: (state: any, payload: any): void => {
      const i = state.documentScans.findIndex((item: any) => item.id == payload);
      state.documentScans.splice(i, 1);
    },
  },
  actions: {
    upload: async (context: any, payload: any): Promise<Response> => {
      return await fetch(process.env.VUE_APP_BASE_URL + `${api}upload`, {
        method: 'POST',
        body: payload,
      });
    },

    download: async (context: any, file: any): Promise<void> => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + `${api}download/${file.url}`, {
        method: 'GET',
      });
      const fileURL = window.URL.createObjectURL(new Blob([await res.blob()]));
      const fileLink = document.createElement('a');

      fileLink.href = fileURL;
      fileLink.setAttribute('download', file.name);
      document.body.appendChild(fileLink);
      fileLink.click();
      return;
    },

    delete: async (context: any, id: string): Promise<void> => {
      await fetch(process.env.VUE_APP_BASE_URL + `${api}${id}`, {
        method: 'DELETE',
      });
    },
  },
};