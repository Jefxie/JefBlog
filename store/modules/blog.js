import vm from "vue";
import { GetCategoryList, GetArticleList } from "~/api/blog";

export default {
  state: {
    categoryList: [],
    articleList: {}
  },
  mutations: {
    ADD_CATEGORYLIST(state, v) {
      vm.set(state, "categoryList", v);
    },
    ADD_ARTICLELIST(state, data) {
      vm.set(state.articleList, data.key, data.val);
    },
    PUSH_ARTICLELIST(state, data) {
      state.articleList[data.key].push(...data.val);
    }
  },
  actions: {
    async getCategoryList({ commit, state }) {
      if (state.categoryList && state.categoryList.length > 0) return;
      const res = await GetCategoryList();
      //   debugger
      commit("ADD_CATEGORYLIST", res.data);
    },
    async getArticleList({ commit, state }, data) {
      if (data.ispush) {
        const res = await GetArticleList(data.category, data.total, data.page);
        data.val = res.data;
        commit("PUSH_ARTICLELIST", data);
      } else {
        if (
          state.articleList[data.key] &&
          state.articleList[data.key].length > 0
        )
          return;

        const res = await GetArticleList(data.category);
        data.val = res.data;
        commit("ADD_ARTICLELIST", data);
      }
    }
  }
};
