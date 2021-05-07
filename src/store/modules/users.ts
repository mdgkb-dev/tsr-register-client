import HttpClient from '@/services/HttpClient';

const httpClient = new HttpClient('user');

export default {
  namespaced: true,
  state: {
    users: [],
  },
  getters: {
    users: (state: any) => {
      return state.users;
    },
    getById: (state: any) => (id: number) => {
      return state.users.find((user: any) => user.id === id);
    },
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.users = payload;
    },
    create: (state: any, payload: any) => {
      state.users.push(payload);
    },
    update: (state: any, payload: any) => {
      const item = state.users.find((item: any) => item.id === payload.id);
      if (item) {
        Object.assign(item, payload);
      }
    },
    delete: (state: any, payload: any) => {
      const i = state.someArrayofObjects.map((item: any) => item.id).indexOf(payload);
      state.users.splice(i, 1);
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
