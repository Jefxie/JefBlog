module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "雨夜客栈(博客)",
    titleTemplate: "%s - Jef.site 雨夜客栈(博客)",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Jef.site 雨夜客栈(博客)"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  // css
  css: ["~/assets/styles/main.scss"],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },
    vendor: ["axios","js-cookie","dayjs", "~/assets/icon/iconfont", "~/plugins/iView"]
  },
  plugins: ["~/plugins/iView"],
  // router
  router: {
    middleware: "routeMonitor"
  }
};
