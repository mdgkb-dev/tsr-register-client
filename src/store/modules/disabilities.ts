export default {
  namespaced: true,
  state: {
    disabilities: [],
  },
  getters: {
    disabilities: (state: any) => {
      return state.disabilities;
    },
    getById: (state: any) => (id: number) => {
      return state.disabilities.find((item: any) => item.id === id);
    },
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.disabilities = payload;
    },
    create: (state: any, payload: any) => {
      state.disabilities.push(payload);
    },
    edit: (state: any, payload: any) => {
      const item = state.disabilities.find((item: any) => item.id === payload.recordId);
      Object.assign(item, payload);
    },
    delete: (state: any, payload: any) => {
      const i = state.disabilities.findIndex((disabilities: any) => disabilities.id == payload);
      state.disabilities.splice(i, 1);
    },
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + 'disability');
      context.commit('set', await res.json());
    },
    create: async (context: any, payload: any) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + 'disability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      context.commit('create', await res.json());
    },
    edit: async (context: any, payload: any) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + `disability/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      context.commit('edit', await res.json());
    },
    delete: async (context: any, id: any) => {
      await fetch(process.env.VUE_APP_BASE_URL + `disability/${id}`, {
        method: 'DELETE',
      });
      context.commit('delete', id);
    },
  },
};
