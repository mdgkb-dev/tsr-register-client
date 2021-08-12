import ISma from '@/interfaces/sma/ISma';
import IState from '@/interfaces/sma/IState';

const api = 'sma';

export default {
  namespaced: true,
  state: {
    sma: [],
    smaItem: {},
  },
  getters: {
    getAll: (state: IState): ISma[] => state.sma,
    getById:
      (state: IState) =>
      (id: string): ISma | undefined =>
        state.sma.find((item: ISma) => item.id === id),
  },
  mutations: {
    set: (state: IState, payload: ISma[]) => {
      state.sma = payload;
    },
    create: (state: IState, payload: ISma) => {
      state.sma.push(payload);
    },
    update: (state: IState, payload: ISma) => {
      const item = state.sma.find((i: any) => i.id === payload.id);
      Object.assign(item, payload);
    },
    delete: (state: IState, payload: ISma) => {
      const i = state.sma.findIndex((item: any) => item.id === payload);
      state.sma.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + api);
      context.commit('set', await res.json());
    },
    create: async (context: any, payload: ISma) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      context.commit('create', await res.json());
    },
    edit: async (context: any, payload: ISma) => {
      const res = await fetch(`${process.env.VUE_APP_BASE_URL}${api}${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      context.commit('update', await res.json());
    },
    delete: async (context: any, id: string): Promise<void> => {
      await fetch(`${process.env.VUE_APP_BASE_URL}${api}${id}`, {
        method: 'DELETE',
      });

      context.commit('delete', id);
    },
  },
};
