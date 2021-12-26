import Vue from "vue";
import axios from "axios";

export class AuthStoreModule {
  static state = Vue.observable({
    user: false,
    token: localStorage.getItem("token")
  });

  static get user() { return this.state.user; }
  static set user(val) { this.state.user = val; }

  static get token() { return this.state.token }
  static set token(val) {
    if (val === null) {
      localStorage.removeItem("token");
      this.state.token = null;
      return;
    }

    localStorage.setItem("token", val);
    this.state.token = val;
  }

  static login(data) {
    return axios.post(`/auth/login`, data)
      .then(({ data }) => {
        this.token = data.token;
        this.user = data.user;
      })
  }
}
