import { ref } from "vue";
import api from "./api.axios";

export class AuthStore {
  static state = ref({
    user: false,
    token: localStorage.getItem("token")
  });

  static get user() {
    return AuthStore.state.value.user;
  }

  static set user(val) {
    AuthStore.state.value.user = val;
  }

  static get token() {
    return AuthStore.state.value.token;
  }

  static set token(val) {
    if (!val) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", val);
    }

    AuthStore.state.value.token = val;
  }

  static login(username, password) {
    return api.post(`/auth/login`, { username, password })
      .then(res => {
        this.user = res.data.user;
        this.token = res.data.token;
        return res.data;
      });
  }

  static fetchUser() {
    return api.get(`/auth/user`)
      .then(res => {
        this.user = res.data;
        return res.data;
      });
  }
}
