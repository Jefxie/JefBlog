import vm from "vue";
import Cookie from "js-cookie";
import { GetUserInfo, UserLogout, GetGitHubStar } from "~/api/user";

export default {
  state: {
    userInfo: {},
    gitHubStar: 0
  },
  mutations: {
    SET_USERINFO(state, v) {
      vm.set(state, "userInfo", v);
    },
    ADD_STAR(state, v) {
      vm.set(state, "gitHubStar", v);
    }
  },
  actions: {
    async getUserInfo({ commit, state }) {
      //   debugger;
      if (state.userInfo.id) return;
      if (Cookie.get("_jefLoginFlag")) {
        try {
          const res = await GetUserInfo();
          commit("SET_USERINFO", res.data);
        } catch (error) {
          Cookie.remove("_jefLoginFlag");
        }
      }
    },
    async userLogout({ commit }, msg) {
      try {
        await UserLogout();
        commit("SET_USERINFO", {});
        Cookie.remove("_jefLoginFlag");
        msg();
      } catch (error) {
        Cookie.remove("_jefLoginFlag");
      }
    },
    async getGitHubStar({ commit, state }) {
      if (state.gitHubStar) return;
      const res = await GetGitHubStar();
      commit("ADD_STAR", res.stargazers_count);
    }
  }
};
