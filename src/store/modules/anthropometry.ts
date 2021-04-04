export default {
  namespaced: true,
  state: {
    anthropometry: [],
  },
  getters: {
    anthropometry: (state: any) => {
      return state.anthropometry;
    },
    getById: (state: any) => (id: number) => {
      return state.anthropometry.find((item: any) => item.id === id);
    },
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.anthropometry = payload;
    },
    create: (state: any, payload: any) => {
      state.anthropometry.push(payload);
    },
    edit: (state: any, payload: any) => {
      const item = state.anthropometry.find((item: any) => item.id === payload.recordId);
      Object.assign(item, payload);
    },
    delete: (state: any, payload: any) => {
      const i = state.anthropometry.findIndex((anthropometry: any) => anthropometry.id == payload);
      state.anthropometry.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + 'anthropometry');
      context.commit('set', await res.json());
    },
    create: async (context: any, payload: any) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + 'anthropometry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      context.commit('create', await res.json());
    },
    edit: async (context: any, payload: any) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + `anthropometry/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      context.commit('edit', await res.json());
    },
    delete: async (context: any, id: any) => {
      await fetch(process.env.VUE_APP_BASE_URL + `anthropometry/${id}`, {
        method: 'DELETE',
      });
      context.commit('delete', id);
    },
  },
};
