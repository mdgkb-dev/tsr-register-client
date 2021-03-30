import Vuex from "vuex";
import humans from "./modules/humans/humans";
import auth from "./modules/auth/auth";
import patients from "./modules/patients/patients";
import representatives from "./modules/representatives/representatives";
import documents from "./modules/documents/documents";

export default new Vuex.Store({
  state: {
    layout: "main-layout"
  },
  modules: { humans, auth, patients, representatives, documents },
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
