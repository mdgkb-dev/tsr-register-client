import IPatient from '../../interfaces/patients/IPatient';

const api = "patient/";

export default {
  namespaced: true,
  state: {
    patients: []
  },
  getters: {
    getPatientsNames: (state: any) => {
      return state.patients;
    },
    patients: (state: any): IPatient[] => {
      return state.patients;
    },
    getById: (state: any) => {
      return (id: number): IPatient => {
        return state.patients.find((human: any) => human.id === id);
      }
    }
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.patients = payload;
    },
    create: (state: any, payload: any) => {
      state.patients.push(payload);
    },
    update: (state: any, payload: any) => {
      const item = state.patients.find(
        (item: any) => item.id === payload.recordId
      );
      Object.assign(item, payload);
    },
    delete: (state: any, payload: any) => {
      const i = state.someArrayofObjects
        .map((item: any) => item.id)
        .indexOf(payload);
      state.patients.splice(i, 1);
    }
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
        body: JSON.stringify(payload)
      });
      context.commit('create', res.json());
    },
    edit: async (context: any, payload: any) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + `${api}${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      console.log(await res.json());

      context.commit('update', res.json());
    },
    delete: async (context: any, id: any) => {
      await fetch(process.env.VUE_APP_BASE_URL + `${api}${id}`, {
        method: 'DELETE'
      });
      context.commit('delete', id);
    }
  },
};
