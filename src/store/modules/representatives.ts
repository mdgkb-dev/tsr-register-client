import HttpClient from '@/services/HttpClient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import Representative from '@/classes/representatives/Representative';

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
    set: (state: any, payload: IRepresentative[]): void => {
      state.representatives = payload.map((r: IRepresentative) => new Representative(r));
    },
    create: (state: any, payload: IRepresentative): void => {
      state.representatives.push(new Representative(payload));
    },
    update: (state: any, payload: IRepresentative): void => {
      const item = state.representatives.find((i: any) => i.id === payload.id);
      if (item) {
        Object.assign(item, payload);
      }
    },
    delete: (state: any, payload: any): void => {
      const i = state.representatives.findIndex((item: any) => item.id === payload);
      state.representatives.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      context.commit('set', await httpClient.get());
    },
    create: async (context: any, payload: IRepresentative): Promise<void> => {
      context.commit('create', await httpClient.post(payload));
    },
    edit: async (context: any, payload: IRepresentative): Promise<void> => {
      context.commit('update', await httpClient.put(payload, payload.id));
    },
    delete: async (context: any, id: string): Promise<void> => {
      context.commit('delete', await httpClient.delete(id));
    },
  },
};
