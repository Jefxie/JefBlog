<template>
  <section class="home">
    <div class="home-banner">
        <x-banner />
    </div>
    <div class="home-context">
        <x-line text="推荐分类"></x-line>
        <div class="home-category">
            <template v-for="(item,i) in categoryList">
                <x-plaque 
                :key="i"
                :title="item.name"
                :alias="item.alias"
                :text="item.brief">
                </x-plaque>
            </template>
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

