import HttpClient from '@/services/HttpClient';

const httpClient = new HttpClient('representative');

export default {
  namespaced: true,
  state: {
    representatives: [],
  },
  getters: {
    representatives: (state: any) => state.representatives,
    getById: (state: any) => (id: number) => state.representatives.find((representative: any) => representative.id === id),
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.representatives = payload;
    },
    create: (state: any, payload: any) => {
      state.representatives.push(payload);
    },
    update: (state: any, payload: any) => {
      const item = state.representatives.find((i: any) => i.id === payload.id);
      if (item) {
        Object.assign(item, payload);
      }
    },
    delete: (state: any, payload: any) => {
      const i = state.representatives.findIndex((item: any) => item.id === payload);
      state.representatives.splice(i, 1);
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
