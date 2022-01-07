import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import { AuthStore } from "../store/auth.store";
import Explorer from "../views/Explorer";
import validateRoute from "../composables/router/validate-route.composable";

const routes = [
  {
    path: "/",
    name: "Sign in",
    component: Login,
    meta: { loggedIn: false }
  },
  {
    path: "/explorer",
    name: "File explorer",
    component: Explorer,
    meta: { loggedIn: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

let startRouter;
const startRouterPromise = new Promise(r => {
  startRouter = r;
});

router.beforeEach(async (to, from, next) => {
  await startRouterPromise;

  const validation = validateRoute(to);

  if (!validation.pass) next(validation.redirect);
  else next();
});

export {
  router as default,
  startRouter
};
