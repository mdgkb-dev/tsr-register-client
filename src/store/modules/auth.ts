export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    user: '',
    hasLoadedOnce: false,
  },
  getters: {
    getUserName: (state: any) => { return state.user },
    isAuthenticated: (state: any) => { return !!state.token },
    authStatus: (state: any) => { return state.status },
  },
  mutations: {
    login: (state: any, payload: any) => {
      localStorage.setItem('user-token', payload.token.token);
      state.status = 'success';
      state.user = payload.user;
      state.token = payload.token.token;
      state.hasLoadedOnce = true;
    }
  },
  actions: {
    login: async (context: any, payload: any) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + 'login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      context.commit('login', await res.json());
    },
    logout: () => {
      localStorage.removeItem('user-token');
    }
  },
};
