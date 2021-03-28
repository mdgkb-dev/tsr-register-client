const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: (state: any) => !!state.token,
  authStatus: (state: any) => state.status
};

const actions = {
  login: async (context: any, payload: any) => {
    const res = await fetch(process.env.VUE_APP_BASE_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    context.commit("login", res.json());
  }
};

const mutations = {
  login: (state: any, payload: any) => {
    localStorage.setItem("user-token", payload.token);
    state.status = "success";
    state.token = payload.token;
    state.hasLoadedOnce = true;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
