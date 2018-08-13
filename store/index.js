import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import user from "./modules/user";
import blog from "./modules/blog";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    modules: {
      user,
      blog
    },
    getters
  });

export default store;
