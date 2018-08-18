<template>
  <section class="home">
    <div class="home-banner">
        <x-banner />
    </div>
    <div class="home-context">
        <x-line text="GitHub"></x-line>
        <div class="home-category">
            <!-- <template v-for="(item,i) in categoryList"> -->
                <a href="https://github.com/Jefxie/JefBlogServer" target="_blank">
                    <x-plaque 
                    title="JefServer"
                    alias="node"
                    text="这个网站的后台系统，基于NodeJS Egg框架开发。">
                    </x-plaque>
                </a>
                <a href="https://github.com/Jefxie/JefBlog" target="_blank">
                    <x-plaque 
                    title="JefBlog"
                    alias="vue"
                    text="使用Nuxt开发的服务器端渲染的博客展示和管理实践项目。">
                    </x-plaque>
                </a>
                <a href="https://github.com/Jefxie/blog-server_v2" target="_blank">
                    <x-plaque 
                    title="ServerV2"
                    alias="koa"
                    text="使用KOA2加TypeScript配合PG开发的接口，前期上手项目。">
                    </x-plaque>
                </a>
                <a href="https://github.com/Jefxie/image-server" target="_blank">
                    <x-plaque 
                    title="Image"
                    alias="koa"
                    text="使用KOA2写的静态资源服务器，上传图片会转成Webp。">
                    </x-plaque>
                </a>
            <!-- </template> -->
        </div>
        <x-line text="自豪地使用"></x-line>
        <!-- 框架logo -->
        <div class="home-frame">
            <ul>
                <li>
                    <svg class="icon weibo" aria-hidden="true">
                        <use xlink:href="#icon-nodejs1"></use>
                    </svg>
                </li>
                <!-- <li>
                    <svg class="icon weibo" aria-hidden="true">
                        <use xlink:href="#icon-koa"></use>
                    </svg>
                </li> -->
                <li>
                    <svg class="icon weibo" aria-hidden="true">
                        <use xlink:href="#icon-pg"></use>
                    </svg>
                </li>
                <li>
                    <svg class="icon weibo" aria-hidden="true">
                        <use xlink:href="#icon-vuejs"></use>
                    </svg>
                </li>
                <li>
                    <svg class="icon weibo" aria-hidden="true">
                        <use xlink:href="#icon-alinode"></use>
                    </svg>
                </li>
                <li>
                    <svg class="icon weibo" aria-hidden="true">
                        <use xlink:href="#icon-redis1"></use>
                    </svg>
                </li>
                <li>
                    <svg class="icon weibo" aria-hidden="true">
                        <use xlink:href="#icon-mongo-db"></use>
                    </svg>
                </li>
            </ul>
        </div>
    </div>
  </section>
</template>

<script>
import XBanner from "~/components/XBanner";
import XLine from "~/components/XLine";
import XPlaque from "~/components/XPlaque";
export default {
    name: "home",
    data() {
        return {
            categoryList: [
                { name: "node", alias: "alias", brief: "brief" },
                { name: "node", alias: "alias", brief: "brief" },
                { name: "node", alias: "alias", brief: "brief" },
                { name: "node", alias: "alias", brief: "brief" }
            ]
        };
    },
    components: {
        XBanner,
        XLine,
        XPlaque
    },
    head() {
        return {
            title: "首页",
            meta: [
                {
                    hid: "home",
                    name: "home",
                    content: "首页 Jef.site 雨夜客栈(博客)"
                }
            ]
        };
    }
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";

.home {
    width: 100%;

    &-context {
        width: $wrap;
        margin: 0 auto;
    }
    &-category {
        width: $wrap;
        display: flex;
        justify-content: space-between;
        margin: 20px auto;
    }
    &-frame {
        width: 100%;
        height: 180px;

        ul {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        li {
            svg {
                font-size: 100px;
            }
            transition: 0.2s;
            &:hover {
                transform: scale(1.2);
            }
        }
    }
}
</style>

