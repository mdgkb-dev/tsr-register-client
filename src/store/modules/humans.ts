import HttpClient from '@/services/HttpClient';

const httpClient = new HttpClient('humans');

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {
    items: (state: any) => state.items,
    getById: (state: any) => (id: number) => state.items.find((human: any) => human.id === id),
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.items = payload;
    },
    create: (state: any, payload: any) => {
      state.items.push(payload);
    },
    update: (state: any, payload: any) => {
      const item = state.items.find((i: any) => i.id === payload.id);
      if (item) {
        Object.assign(item, payload);
      }
    },
    delete: (state: any, payload: any) => {
      const i = state.someArrayofObjects.map((item: any) => item.id).indexOf(payload);
      state.items.splice(i, 1);
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
