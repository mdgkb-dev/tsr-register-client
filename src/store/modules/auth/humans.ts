const state = () => ({
  status: "",
  token: localStorage.getItem("token") || "",
  user: {}
});

const getters = {
  isLoggedIn: (state: any) => !!state.token,
  authStatus: (state: any) => state.status
};

const mutations = {
  authSuccess(state: any, payload: any) {
    state.status = "success";
    state.token = payload.token;
    state.user = payload.user;
  },
  authError(state: any) {
    state.status = "error";
  },
  logout(state: any) {
    state.status = "";
    state.token = "";
  }
};

const actions = {
  login: async (context: any, payload: any) => {
    const res = await fetch(process.env.VUE_APP_BASE_URL + "human", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    context.commit("authSuccess", res.json());
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
