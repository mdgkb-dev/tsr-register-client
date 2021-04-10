import IPatient from '../../interfaces/patients/IPatient';

const api = 'mkb/';

export default {
  namespaced: true,
  state: {
    mkb: [],
  },
  getters: {
    mkb: (state: any) => {
      return state.mkb;
    },
    patients: (state: any): IPatient[] => {
      return state.mkb;
    },
    getById: (state: any) => {
      return (id: number): IPatient => {
        return state.mkb.find((diagnosis: any) => diagnosis.id === id);
      };
    },
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.mkb = payload;
    },
    create: (state: any, payload: any) => {
      state.mkb.push(payload);
    },
    update: (state: any, payload: any) => {
      const item = state.mkb.find((item: any) => item.id === payload.recordId);

      Object.assign(item, payload);
    },
    delete: (state: any, payload: any) => {
      const i = state.mkb.findIndex((item: any) => item.id == payload);
      state.mkb.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + api);
      context.commit('set', await res.json());
    },
    create: async (context: any, payload: any) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      context.commit('create', await res.json());
    },
    edit: async (context: any, payload: any) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + `${api}${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      context.commit('update', await res.json());
    },
    delete: async (context: any, id: any) => {
      await fetch(process.env.VUE_APP_BASE_URL + `${api}${id}`, {
        method: 'DELETE',
      });

      context.commit('delete', id);
    },
  },
};
