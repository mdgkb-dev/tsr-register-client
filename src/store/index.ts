import Vuex from "vuex";
import humans from "./modules/humans/humans";
import auth from "./modules/auth/auth";
import patients from "./modules/patients/patients";

export default new Vuex.Store({
  state: {
    layout: "main-layout"
  },
  modules: { humans, auth, patients },
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
