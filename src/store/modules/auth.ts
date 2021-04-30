import Cookies from 'js-cookie';
import IAuthState from '@/interfaces/states/IAuthState';
import IUserAuthorized from '@/interfaces/users/IUserAuthorized';
import IUserLogin from '@/interfaces/users/IUserLogin';
import IUserRegister from '@/interfaces/users/IUserRegister';

export default {
  namespaced: true,
  state: {
    userId: '',
    userlogin: '',
    userRegion: '',
    isAuthorized: false,
    authorizationError: '',
  },
  getters: {
    getUserId: (state: IAuthState) => {
      return state.userId;
    },
    getUserLogin: (state: IAuthState) => {
      return state.userlogin;
    },
    getUserRegion: (state: IAuthState) => {
      return state.userRegion;
    },
    isAuthorized: (state: IAuthState) => {
      return state.isAuthorized;
    },
    authError: (state: IAuthState) => {
      return state.authorizationError;
    },
  },
  mutations: {
    authorize: (state: IAuthState, userData: IUserAuthorized) => {
      state.userId = userData.id;
      state.userlogin = userData.login;
      state.userRegion = userData.region;
      state.isAuthorized = true;
      Cookies.set('user_id', userData.id);
      const cookie = Cookies.get('user_sid');

      if (cookie) {
        window.localStorage.setItem('user_sid', cookie);
      }
    },
    deAuthorize: (state: IAuthState) => {
      state.userId = '';
      state.userlogin = '';
      state.userRegion = '';
      state.isAuthorized = false;
      Cookies.remove('user_sid');
      window.localStorage.removeItem('user_sid');
    },
    setRegistrationError: (state: IAuthState, errorMessage: string) => {
      state.authorizationError = errorMessage;
    },
  },
  actions: {
    login: async (context: any, userData: IUserLogin) => {
      let response;
      try {
        response = await fetch(process.env.VUE_APP_BASE_URL + 'login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
      } catch (error) {
        return;
      }

      if (response?.status === 401) {
        context.commit('setRegistrationError', 'Проверьте корректность введённых данных');
        return;
      }

      if (response?.status !== 200) {
        context.commit(
          'setRegistrationError',
          'Не удалось войти. Пожалуйста, обратитесь к разработчикам.'
        );
        return;
      }

      context.commit('authorize', await response.json());
    },
    register: async (context: any, userData: IUserRegister) => {
      let response;

      try {
        response = await fetch(process.env.VUE_APP_BASE_URL + 'user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
      } catch (error) {
        console.log(error);
        return;
      }

      if (response?.status != 200) {
        context.commit(
          'authorizationError',
          'Не удалось зарегистрироваться. Пожалуйста, обратитесь к разработчикам.'
        );
        return;
      }

      context.commit('authorize', await response.json());
    },
    logout: async (context: any) => {
      let response;

      try {
        response = await fetch(process.env.VUE_APP_BASE_URL + 'logout', {
          method: 'POST',
        });
      } catch (error) {
        console.log(error);
        return;
      }

      if (response.status !== 200) {
        console.log('Ошибка выхода.');
      }

      Cookies.remove('user_sid');
      window.localStorage.removeItem('user_sid');
      context.commit('deAuthorize');
    },
    deAuthorize: (context: any) => {
      context.commit('deAuthorize');
    },
    setAuthorization: async (context: any) => {
      let response;

      try {
        response = await fetch(process.env.VUE_APP_BASE_URL + 'login');
      } catch (error) {
        context.commit('deAuthorize');
        return;
      }

      if (response.status !== 200) {
        context.commit('deAuthorize');
        return;
      }

      context.commit('authorize', await response.json());
    },
  },
};
