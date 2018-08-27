export default {
  categoryList: state => state.blog.categoryList,
  articleList: state => state.blog.articleList,
  detailData: state => state.blog.detailData,
  commentList: state => state.blog.commentList,

  // user
  userInfo: state => state.user.userInfo,
  gitHubStar: state => state.user.gitHubStar
};
