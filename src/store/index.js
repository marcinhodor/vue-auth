import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    userEmail: null,
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    clearAuth(state) {
      state.idToken = null;
      state.userId = null;
    },
  },
  actions: {
    signup({ commit }, authData) {
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          console.log(res);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId,
          });
          localStorage.setItem("token_vue_auth", res.data.idToken);
          localStorage.setItem("userId_vue_auth", res.data.localId);
          router.push("/dashboard");
        })
        .catch((err) => console.log(err));
    },
    login({ commit }, authData) {
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId,
          });
          localStorage.setItem("token_vue_auth", res.data.idToken);
          localStorage.setItem("userId_vue_auth", res.data.localId);
          router.push("/dashboard");
        })
        .catch((error) => console.log(error));
    },
    logout({ commit }) {
      commit("clearAuth");
      localStorage.removeItem("token_vue_auth");
      localStorage.removeItem("userId_vue_auth");
      router.replace("/login");
    },
    AutoLogin({ commit }) {
      const token = localStorage.getItem("token_vue_auth");
      if (!token) {
        return;
      }
      const userId = localStorage.getItem("userId_vue_auth");
      commit("authUser", {
        idToken: token,
        userId: userId,
      });
    },
  },
  getters: {
    user(state) {
      return state.userEmail;
    },
    ifAuthenticated(state) {
      return state.idToken !== null;
    },
  },
});
