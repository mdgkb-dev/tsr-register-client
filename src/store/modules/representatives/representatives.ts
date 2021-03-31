const state = () => ({
  representatives: []
});
const api = "representative/";

const getters = {
  representatives: (state: any) => {
    return state.representatives;
  },
  getById: (state: any) => (id: number) => {
    return state.representatives.find(
      (representative: any) => representative.id === id
    );
  }
};

const mutations = {
  set: (state: any, payload: any) => {
    state.representatives = payload;
  },
  create: (state: any, payload: any) => {
    state.representatives.push(payload);
  },
  update: (state: any, payload: any) => {
    const item = state.representatives.find(
      (item: any) => item.id === payload.recordId
    );
    Object.assign(item, payload);
  },
  delete: (state: any, payload: any) => {
    const i = state.representatives.findIndex(
      (item: any) => item.id == payload
    );
    state.representatives.splice(i, 1);
  }
};

const actions = {
  getAll: async (context: any) => {
    const res = await fetch(process.env.VUE_APP_BASE_URL + api);
    context.commit("set", await res.json());
  },
  create: async (context: any, payload: any) => {
    const res = await fetch(process.env.VUE_APP_BASE_URL + api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    context.commit("create", await res.json());
  },
  edit: async (context: any, payload: any) => {
    const res = await fetch(
      process.env.VUE_APP_BASE_URL + `${api}${payload.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );
    context.commit("update", await res.json());
  },
  delete: async (context: any, id: any) => {
    await fetch(process.env.VUE_APP_BASE_URL + `${api}${id}`, {
      method: "DELETE"
    });
    context.commit("delete", id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
