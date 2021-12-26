import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { AuthStoreModule } from "./store/auth.store-module";

Vue.config.productionTip = false;

axios.interceptors.request.use(config => {
  config.baseURL = "http://localhost:3000/api";
  config.headers.Authorization = `Bearer ${AuthStoreModule.token}`;

  return config;
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
