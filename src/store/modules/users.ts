const api = 'user/';

export default {
  namespaced: true,
  state: {
    users: [],
  },
  getters: {
    users: (state: any) => {
      return state.users;
    },
    getById: (state: any) => (id: number) => {
      return state.users.find((user: any) => user.id === id);
    },
  },
  mutations: {
    set: (state: any, payload: any) => {
      state.users = payload;
    },
    create: (state: any, payload: any) => {
      state.users.push(payload);
    },
    update: (state: any, payload: any) => {
      const item = state.users.find((item: any) => item.id === payload.recordId);
      Object.assign(item, payload);
    },
    delete: (state: any, payload: any) => {
      const i = state.someArrayofObjects
        .map((item: any) => item.id)
        .indexOf(payload);
      state.users.splice(i, 1);
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
        body: JSON.stringify(payload)
      });
      context.commit('create', await res.json());
    },
    edit: async (context: any, payload: any) => {
      const res = await fetch(
        process.env.VUE_APP_BASE_URL + `${api}${payload.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );
      context.commit('update', await res.json());
    },
    delete: async (context: any, id: any) => {
      await fetch(process.env.VUE_APP_BASE_URL + `${api}${id}`, {
        method: 'DELETE'
      });
      context.commit('delete', id);
    }
  },
};
