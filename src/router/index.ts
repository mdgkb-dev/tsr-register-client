import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Humans from "../views/Humans/Humans.vue";
import Patients from "../views/Patients/Patients.vue";
import Representatives from "../views/Representatives/Representatives.vue";
import Login from "../views/Login/Login.vue";
import store from "../store";

const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to: any, from: any, next: any) => {
  if (localStorage.getItem("user-token")) {
    next();
    return;
  }
  store.commit("setLayout", "login-layout");
  next("/login");
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    beforeEnter: ifAuthenticated
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/humans",
    name: "Humans",
    component: Humans,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/patients",
    name: "Patients",
    component: Patients,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/representatives",
    name: "Representatives",
    component: Representatives,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: ifNotAuthenticated
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
