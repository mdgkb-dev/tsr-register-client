import HttpClient from '@/services/HttpClient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import Representative from '@/classes/representatives/Representative';

const httpClient = new HttpClient('representatives');

export default {
  namespaced: true,
  state: {
    representatives: [],
    representative: {},
  },
  getters: {
    representatives: (state: any) => state.representatives,
    representative: (state: any) => state.representative,
    getById: (state: any) => (id: number) => state.representatives.find((representative: any) => representative.id === id),
  },
  mutations: {
    setAll: (state: any, payload: IRepresentative[]): void => {
      state.representatives = payload.map((r: IRepresentative) => new Representative(r));
    },
    set: (state: any, representative: IRepresentative) => {
      state.representative = new Representative(representative);
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
      context.commit('setAll', await httpClient.get());
    },
    get: async (context: any, representativeId: string) => {
      context.commit('set', await httpClient.get(representativeId));
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
