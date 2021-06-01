import HttpClient from '@/services/HttpClient';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import Anthropometry from '@/classes/anthropometry/Anthropometry';

const httpClient = new HttpClient('anthropometries');

export default {
  namespaced: true,
  state: {
    anthropometries: [],
    anthropometry: {},
  },
  getters: {
    anthropometries: (state: any) => state.anthropometries,
    anthropometry: (state: any) => state.anthropometry,
    getById: (state: any) => (id: number) => state.anthropometry.find((item: any) => item.id === id),
  },
  mutations: {
    setAll: (state: any, anthropometries: IAnthropometry[]) => {
      state.anthropometries = anthropometries.map((a: IAnthropometry) => new Anthropometry(a));
    },
    set: (state: any, anthropometry: IAnthropometry) => {
      state.anthropometry = new Anthropometry(anthropometry);
    },
    create: (state: any, payload: IAnthropometry) => {
      state.anthropometries.push(new Anthropometry(payload));
    },
    update: (state: any, payload: IAnthropometry) => {
      const item = state.anthropometries.find((i: any) => i.id === payload.id);
      if (item) {
        Object.assign(item, payload);
      }
    },
    delete: (state: any, id: string) => {
      const i = state.anthropometries.findIndex((anthropometry: any) => anthropometry.id === id);
      state.anthropometries.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      context.commit('setAll', await httpClient.get());
    },
    get: async (context: any, anthropometryId: string) => {
      context.commit('set', await httpClient.get(anthropometryId));
    },
    create: async (context: any, payload: IAnthropometry): Promise<void> => {
      context.commit('create', await httpClient.post({ payload }));
    },
    edit: async (context: any, payload: IAnthropometry): Promise<void> => {
      context.commit('update', await httpClient.put(payload, payload.id));
    },
    delete: async (context: any, id: string): Promise<void> => {
      context.commit('delete', await httpClient.delete(id));
    },
  },
};
