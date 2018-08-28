// const ENV = "dev";
const ENV = 'prod';

const URI = {
  dev: {
    baseURL: "http://127.0.0.1:7001/",
    imgAction: "http://upload-z2.qiniup.com",
    githubStart: "https://api.github.com/repos/Jefxie/JefBlog",
    returnUrl: "http://localhost:3010",
    passportUrl: "http://127.0.0.1:7001/passport/github",
    imgParam:
      "?imageMogr2/auto-orient/thumbnail/650x650>/format/webp/blur/1x0/quality/80|watermark/1/image/aHR0cDovL2ltYWdlLmplZi5zaXRlL2xvZ29fdzUwLnBuZw==/dissolve/20/gravity/SouthEast/dx/10/dy/10"
  },
  prod: {
    baseURL: "https://api.jef.site/",
    imgAction: "https://upload-z2.qiniup.com",
    githubStart: "https://api.github.com/repos/Jefxie/JefBlog",
    returnUrl: "https://www.jef.site",
    passportUrl: "https://api.jef.site/passport/github",
    imgParam:
      "?imageMogr2/auto-orient/thumbnail/650x650>/format/webp/blur/1x0/quality/80|watermark/1/image/aHR0cDovL2ltYWdlLmplZi5zaXRlL2xvZ29fdzUwLnBuZw==/dissolve/20/gravity/SouthEast/dx/10/dy/10"
  }
};

export default URI[ENV];
