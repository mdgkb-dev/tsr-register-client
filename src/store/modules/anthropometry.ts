import HttpClient from '@/services/HttpClient';

const httpClient = new HttpClient('anthropometry');

export default {
  namespaced: true,
  state: {
    anthropometry: [],
  },
  getters: {
    anthropometry: (state: any) => state.anthropometry,
    getById: (state: any) => (id: number) => state.anthropometry.find((item: any) => item.id === id),
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.anthropometry = payload;
    },
    create: (state: any, payload: any) => {
      state.anthropometry.push(payload);
    },
    edit: (state: any, payload: any) => {
      const item = state.anthropometry.find((i: any) => i.id === payload.id);
      if (item) {
        Object.assign(item, payload);
      }
    },
    delete: (state: any, payload: any) => {
      const i = state.anthropometry.findIndex((anthropometry: any) => anthropometry.id === payload);
      state.anthropometry.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      context.commit('set', await httpClient.get());
    },
    create: async (context: any, payload: any): Promise<void> => {
      context.commit('create', await httpClient.post(payload));
    },
    edit: async (context: any, payload: any): Promise<void> => {
      context.commit('update', await httpClient.put(payload, payload.id));
    },
    delete: async (context: any, id: string): Promise<void> => {
      context.commit('delete', await httpClient.delete(id));
    },
  },
};
