import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import AuthPage from '@/components/Auth/AuthPage.vue';
import PageNotFound from '@/components/PageNotFound.vue';
import indexAdminRoutes from '@/router/indexAdminRoutes';
import TokenService from '@/services/Token';
import UserService from '@/services/User';
import store from '@/store/index';

export const isAuthorized = (next: NavigationGuardNext): void => {
  const user = localStorage.getItem('user');
  if (user) {
    store.commit('auth/setIsAuth', true);
  }
  next();
};

export const authGuard = async (next?: NavigationGuardNext): Promise<void> => {
  // if (next) {
  //   await store.dispatch('auth/setAuth');
  //   const isAuth: boolean = store.getters['auth/isAuth'];
  //   store.commit('auth/showWarning', true);
  //   store.commit('auth/authOnly', true);
  //   if (!isAuth) {
  //     store.commit('auth/openModal', 'login');
  //   }
  //   next();
  //   return;
  // }

  // if (!TokenService.isAuth()) {
  //   router.push('/login');
  // }
};

export const devGuard = (): void => {
  if (!UserService.isAdmin()) {
    router.push('/dev');
  }
};

export const adminGuard = async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  if (to.path != '/main') {
    try {
      await store.dispatch('auth/checkPathPermissions', to.matched[0].path);
    } catch (e) {
      await router.push('/');
    }
  }
  next();
};

const routes: Array<RouteRecordRaw> = [
  ...indexAdminRoutes,
  {
    path: '/',
    redirect: '/admin/patients',
  },
  {
    path: '/login',
    component: AuthPage,
    meta: {
      layout: 'LoginLayout',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

// router.beforeEach(authGuard);

export default router;
