import vm from 'vue';
import {
  GetCategoryList,
  GetArticleList,
  RemoveArticle,
  AddCategory,
  AddAtricle,
  GetArticleDetail,
  GetComment,
  DeleteComment,
} from '~/api/blog';

export default {
  state: {
    categoryList: [],
    articleList: {},
    detailData: {},
    commentList: [],
  },
  mutations: {
    ADD_CATEGORYLIST(state, v) {
      vm.set(state, 'categoryList', v);
    },
    PUSH_CATEGORY(state, v) {
      state.categoryList.push(v);
    },
    ADD_ARTICLELIST(state, data) {
      vm.set(state.articleList, data.key, data.val);
    },
    PUSH_ARTICLELIST(state, data) {
      state.articleList[data.key].push(...data.val);
    },
    REMOVE_ARTICLE(state, data) {
      const _data = state.articleList[data.key];
      for (let i = 0, len = _data.length; i < len; i++) {
        if (_data[i].id == data.id) {
          vm.delete(_data, i);
          break;
        }
      }
    },
    ADD_DETAILDATA(state, data) {
      vm.set(state, 'detailData', data);
    },
    ADD_COMMENTLIST(state, data) {
      vm.set(state, 'commentList', data);
    },
    DEL_ONECOMMENT(state, id) {
      const list = state.commentList;
      for (let i = 0, len = list.length; i < len; i++) {
        if (list[i].id === id) {
          // list.splice(i,1)
          vm.delete(list, i);
        }
      }
    },
  },
  actions: {
    async getCategoryList({ commit, state }) {
      if (state.categoryList && state.categoryList.length > 0) return;
      const res = await GetCategoryList();
      //   debugger
      commit('ADD_CATEGORYLIST', res.data);
    },
    async getArticleList({ commit, state }, data) {
      if (data.ispush) {
        const res = await GetArticleList(data.category, data.total, data.page);
        data.val = res.data;
        commit('PUSH_ARTICLELIST', data);
      } else {
        if (
          data.key != 'all' &&
          state.articleList[data.key] &&
          state.articleList[data.key].length > 0
        )
          return;

        const res = await GetArticleList(data.category);
        data.val = res.data;
        commit('ADD_ARTICLELIST', data);
      }
    },
    async removeArticle({ commit }, data) {
      try {
        await RemoveArticle(data.id);
        commit('REMOVE_ARTICLE', data);
        return Promise.resolve(1);
      } catch (error) {
        return Promise.reject(0);
      }
    },
    async addCategory({ commit }, data) {
      try {
        const res = await AddCategory(data.name, data.alias);
        commit('PUSH_CATEGORY', res.data);
        return Promise.resolve(1);
      } catch (error) {
        return Promise.reject(0);
      }
    },
    async addArticle({ commit }, data) {
      try {
        const res = await AddAtricle(data);
        commit('PUSH_ARTICLELIST', {
          key: 'all',
          val: res.data,
        });
        return Promise.resolve(1);
      } catch (error) {
        return Promise.reject(0);
      }
    },
    async addDetailData({ commit }, id) {
      const res = await GetArticleDetail(id);
      commit('ADD_DETAILDATA', res.data);
    },
    async addCommentList({ commit }, id) {
      const res = await GetComment(id);
      commit('ADD_COMMENTLIST', res.data);
    },
    async deleteComment({ commit }, id) {
      try {
        await DeleteComment(id);
        commit('DEL_ONECOMMENT', id);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
