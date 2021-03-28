import Vuex from "vuex";
import humans from "./modules/humans/humans";
export default new Vuex.Store({
  state: {
    layout: "main-layout"
  },
  modules: { humans },
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
