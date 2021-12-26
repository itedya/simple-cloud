import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { AuthStoreModule } from "../store/auth.store-module";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { loggedIn: false }
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Auth/Login.vue'),
    meta: { loggedIn: false }
  },
  {
    path: '/explorer',
    name: "Explorer",
    component: () => import(/* webpackChunkName: "explorer" */ '../views/Explorer.vue'),
    meta: { loggedIn: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

let startRouter;
const startRouterPromise = new Promise(r => startRouter = r);

router.beforeEach(async (to, from, next) => {
  await startRouterPromise;

  const loggedIn = !! AuthStoreModule.user;

  if (to.meta.loggedIn && to.meta.loggedIn !== loggedIn) {
    next("/auth/login");
  } else if (!to.meta.loggedIn && to.meta.loggedIn !== loggedIn) {
    next("/explorer");
  } else {
    next();
  }
});

export {
  router as default,
  startRouter
}
