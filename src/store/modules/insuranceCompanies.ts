export default {
  namespaced: true,
  state: {
    insuranceCompanies: [],
  },
  getters: {
    insuranceCompanies: (state: any) => {
      return state.insuranceCompanies;
    },
    getById: (state: any) => (id: number) => {
      return state.insuranceCompanies.find((human: any) => human.id === id);
    },
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.insuranceCompanies = payload;
    },
    create: (state: any, payload: any) => {
      state.insuranceCompanies.push(payload);
    },
    edit: (state: any, payload: any) => {
      const insuranceCompany = state.insuranceCompanies.find(
        (insuranceCompany: any) => insuranceCompany.id === payload.recordId
      );
      Object.assign(insuranceCompany, payload);
    },
    delete: (state: any, payload: any) => {
      const i = state.someArrayofObjects
        .map((insuranceCompany: any) => insuranceCompany.id)
        .indexOf(payload);
      state.insuranceCompanies.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + 'insurance-company');
      context.commit('set', await res.json());
    },
    create: async (context: any, payload: any) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + 'insurance-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      context.commit('create', await res.json());
    },
    edit: async (context: any, payload: any) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + `insurance-company/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      context.commit('editHuman', await res.json());
    },
    delete: async (context: any, id: any) => {
      await fetch(process.env.VUE_APP_BASE_URL + `insurance-company/${id}`, {
        method: 'DELETE',
      });
      context.commit('delete', id);
    },
  },
};
