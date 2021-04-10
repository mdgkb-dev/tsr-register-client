export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    errorMessage: '',
    user: '',
    hasLoadedOnce: false,
  },
  getters: {
    getUserName: (state: any) => {
      return state.user;
    },
    isAuthenticated: (state: any) => {
      return !!state.token;
    },
    authStatus: (state: any) => {
      return state.status;
    },
    errorMessage: (state: any) => {
      return state.errorMessage;
    }
  },
  mutations: {
    login: (state: any, payload: any) => {
      localStorage.setItem('user-token', payload.token.token);
      state.status = 'success';
      state.errorMessage = '';
      state.user = payload.user;
      state.token = payload.token.token;
      state.hasLoadedOnce = true;
    },
    setLoginError: (state: any, errorMessage: string): void => {
      state.status = 'error';
      state.errorMessage = errorMessage;
    }
  },
  actions: {
    login: async (context: any, payload: any) => {
      const res = await fetch(process.env.VUE_APP_BASE_URL + 'login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        context.commit('login', await res.json());
        return;
      }

      context.commit('setLoginError', await res.text());
    },
    logout: () => {
      console.log(localStorage.getItem('user-token'));
      localStorage.removeItem('user-token');
      console.log(localStorage.getItem('user-token'));
    },
  },
};
