import vm from "vue";
import { GetCategoryList } from "~/api/blog";

export default {
  state: {
    categoryList:[]
  },
  mutations: {
    ADD_CATEGORYLIST(state, v) {
      vm.set(state, "categoryList", v);
    }
  },
  actions: {
    async getCategoryList({ commit, state }) {
        console.log('sss',state.categoryList.length)
      if (state.categoryList.length) return;
      const res = await GetCategoryList();
    //   debugger
      commit("ADD_CATEGORYLIST", res.data);
    }
  }
};
