const state = () => ({
  items: []
});
const api = "patient/";

const getters = {
  items: (state: any) => {
    return state.items;
  },
  getById: (state: any) => (id: number) => {
    return state.items.find((human: any) => human.id === id);
  }
};

const mutations = {
  set: (state: any, payload: any) => {
    state.items = payload;
  },
  create: (state: any, payload: any) => {
    state.items.push(payload);
  },
  update: (state: any, payload: any) => {
    const item = state.items.find((item: any) => item.id === payload.recordId);
    Object.assign(item, payload);
  },
  delete: (state: any, payload: any) => {
    const i = state.someArrayofObjects
      .map((item: any) => item.id)
      .indexOf(payload);
    state.items.splice(i, 1);
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
    context.commit("create", res.json());
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
    context.commit("update", res.json());
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
