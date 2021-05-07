import HttpClient from '@/services/HttpClient';

const httpClient = new HttpClient('disability');

export default {
  namespaced: true,
  state: {
    disabilities: [],
  },
  getters: {
    disabilities: (state: any) => {
      return state.disabilities;
    },
    getById: (state: any) => (id: number) => {
      return state.disabilities.find((item: any) => item.id === id);
    },
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.disabilities = payload;
    },
    create: (state: any, payload: any) => {
      state.disabilities.push(payload);
    },
    update: (state: any, payload: any) => {
      const item = state.disabilities.find((item: any) => item.id === payload.id);
      if (item) {
        Object.assign(item, payload);
      }
    },
    delete: (state: any, payload: any) => {
      const i = state.disabilities.findIndex((disabilities: any) => disabilities.id == payload);
      state.disabilities.splice(i, 1);
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
