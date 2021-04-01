import { createStore } from 'vuex';

import humans from './modules/humans';
import auth from './modules/auth';
import patients from './modules/patients';
import representatives from './modules/representatives';

export default createStore({
  state: {
    layout: 'main-layout',
  },
  getters: {
    layout(state) {
      return state.layout;
    }
  },
  mutations: {
    setLayout(state, payload) {
      state.layout = payload;
    }
  },
  actions: {
  },
  modules: {
    humans,
    auth,
    patients,
    representatives,
  },
});
