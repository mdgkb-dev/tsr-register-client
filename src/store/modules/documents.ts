const api = "document/";

export default {
  namespaced: true,
  state: {
    documents: [],
  },
  getters: {
    getPatientsNames: (state: any): void => {
      return state.documents;
    },
    documents: (state: any): void => {
      return state.documents;
    },
    getById: (state: any) => (id: number): void => {
      return state.documents.find((human: any) => human.id === id);
    }
  },
  mutations: {
    set: (state: any, payload: any): void => {
      state.documents = payload;
    },
    create: (state: any, payload: any): void => {
      state.documents.push(payload);
    },
    update: (state: any, payload: any): void => {
      const item = state.documents.find(
        (item: any) => item.id === payload.recordId
      );
      Object.assign(item, payload);
    },
    delete: (state: any, payload: any): void => {
      const i = state.someArrayofObjects
        .map((item: any) => item.id)
        .indexOf(payload);
      state.documents.splice(i, 1);
    }
  },
  actions: {
    getAll: async (context: any): Promise<void> => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + api);
      context.commit("set", await res.json());
    },
    create: async (context: any, payload: any): Promise<void> => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      context.commit("create", res.json());
    },
    edit: async (context: any, payload: any): Promise<void> => {
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
    delete: async (context: any, id: any): Promise<void> => {
      await fetch(process.env.VUE_APP_BASE_URL + `${api}${id}`, {
        method: "DELETE"
      });
      context.commit("delete", id);
    }
  },
};
