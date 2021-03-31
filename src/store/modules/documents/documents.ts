const state = () => ({
  documents: []
});
const api = "document/";

const getters = {
  getPatientsNames: (state: any) => {
    return state.documents;
  },
  documents: (state: any) => {
    return state.documents;
  },
  getById: (state: any) => (id: number) => {
    return state.documents.find((human: any) => human.id === id);
  }
};

const mutations = {
  set: (state: any, payload: any) => {
    state.documents = payload;
  },
  create: (state: any, payload: any) => {
    state.documents.push(payload);
  },
  update: (state: any, payload: any) => {
    const item = state.documents.find(
      (item: any) => item.id === payload.recordId
    );
    Object.assign(item, payload);
  },
  delete: (state: any, payload: any) => {
    const i = state.documents.findIndex((item: any) => item.id == payload);
    state.documents.splice(i, 1);
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
