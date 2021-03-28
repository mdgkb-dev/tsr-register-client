import Vuex from "vuex";
import humans from "./modules/humans/humans";
import auth from "./modules/auth/auth";

export default new Vuex.Store({
  state: {
    layout: "main-layout"
  },
  modules: { humans, auth },
  mutations: {
    setLayout(state, payload) {
      state.layout = payload;
    }
  },
  getters: {
    layout(state) {
      return state.layout;
    }
  }
});
