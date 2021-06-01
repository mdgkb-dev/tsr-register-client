import HttpClient from '@/services/HttpClient';
import IDisability from '@/interfaces/disabilities/IDisability';
import Disability from '@/classes/disability/Disability';

const httpClient = new HttpClient('disabilities');

export default {
  namespaced: true,
  state: {
    disabilities: [],
    disability: {},
  },
  getters: {
    disabilities: (state: any) => state.disabilities,
    disability: (state: any) => state.disability,
    getById: (state: any) => (id: number) => state.disabilities.find((item: any) => item.id === id),
  },
  mutations: {
    setAll: (state: any, disabilities: IDisability[]) => {
      state.disabilities = disabilities.map((d) => new Disability(d));
    },
    set: (state: any, disability: IDisability) => {
      state.disability = new Disability(disability);
    },
    create: (state: any, disability: IDisability) => {
      state.disability = new Disability(disability);
    },
    update: (state: any, payload: IDisability) => {
      const item = state.disabilities.find((i: IDisability) => i.id === payload.id);
      if (item) {
        Object.assign(item, payload);
      }
    },
    delete: (state: any, payload: string) => {
      const i = state.disabilities.findIndex((disabilities: any) => disabilities.id === payload);
      state.disabilities.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      context.commit('setAll', await httpClient.get());
    },
    get: async (context: any, disabilityId: string) => {
      context.commit('set', await httpClient.get(disabilityId));
    },
    create: async (context: any, payload: IDisability): Promise<void> => {
      context.commit('create', await httpClient.post({ payload }));
    },
    edit: async (context: any, payload: IDisability): Promise<void> => {
      context.commit('update', await httpClient.put(payload, payload.id));
    },
    delete: async (context: any, id: string): Promise<void> => {
      context.commit('delete', await httpClient.delete(id));
    },
  },
};
