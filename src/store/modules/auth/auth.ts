const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  user: "",
  hasLoadedOnce: false
};

const getters = {
  getUserName: (state: any) => state.user,
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

    context.commit("login", await res.json());
  },
  logout: () => {
    localStorage.removeItem("user-token");
  }
};

const mutations = {
  login: (state: any, payload: any) => {
    localStorage.setItem("user-token", payload.token.token);
    state.status = "success";
    state.user = payload.user;
    state.token = payload.token.token;
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
