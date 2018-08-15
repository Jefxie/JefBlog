import vm from "vue";
import Cookie from "js-cookie";
import { GetUserInfo, UserLogout } from "~/api/user";

export default {
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USERINFO(state, v) {
      vm.set(state, "userInfo", v);
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
    }
  }
};
