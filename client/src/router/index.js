import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Auth/Login.vue')
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

  next();
});

export {
  router as default,
  startRouter
}
