import HttpClient from '@/services/HttpClient';

const httpClient = new HttpClient('representative');

export default {
  namespaced: true,
  state: {
    representatives: [],
  },
  getters: {
    representatives: (state: any) => {
      return state.representatives;
    },
    getById: (state: any) => (id: number) => {
      return state.representatives.find((representative: any) => representative.id === id);
    },
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.representatives = payload;
    },
    create: (state: any, payload: any) => {
      state.representatives.push(payload);
    },
    update: (state: any, payload: any) => {
      const item = state.representatives.find((item: any) => item.id === payload.id);
      if (item) {
        Object.assign(item, payload);
      }
    },
    delete: (state: any, payload: any) => {
      const i = state.representatives.findIndex((item: any) => item.id == payload);
      state.representatives.splice(i, 1);
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
  },
};
