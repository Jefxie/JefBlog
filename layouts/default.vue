<template>
  <div>
    <header class="header">
      <x-header
        :clarity="isHome&&isClarity" 
        :headers='headers'
        :active="curPath"
        :noticeCount="noticeCount"
      />
    </header>
    <div class="container" :class="isHome?'':'pads'">
      <nuxt/>
    </div>
    <x-footer />
    <BackTop></BackTop>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import XHeader from "~/components/XHeader";
import XFooter from "~/components/XFooter";
import { GetNoticeCount } from "~/api/blog";
import { mapActions, mapGetters } from "vuex";
export default {
    name: "layout",
    data() {
        return {
            isClarity: true,
            isHome: false,
            curPath: "",
            noticeCount: 0,
            headers: [
                {
                    name: "首页",
                    path: "/"
                },
                {
                    name: "博客",
                    path: "/blog"
                }
                // {
                //     name: "Pwa",
                //     path: "/pwa"
                // }
            ]
        };
    },
    components: {
        XHeader,
        XFooter
    },
    computed: {
        ...mapGetters(["userInfo"])
    },
    created() {
        this.getCategoryList();
    },
    mounted() {
        if (this.isHome) {
            window.addEventListener("scroll", this.handleScroll);
        }
    },
    watch: {
        $route: {
            handler: async function(val, old) {
                if (this.userInfo && this.userInfo.id) {
                    const res = await GetNoticeCount(this.userInfo.id,1);
                    this.noticeCount = res.data;
                } else {
                    this.getUserInfo();
                }
                this.curPath = val.path;
                if (val.path === "/") {
                    this.isHome = true;
                    return;
                }
                this.isHome = false;
            },
            immediate: true
        },
        userInfo: async function(val, old) {
            if (val.id) {
                const res = await GetNoticeCount(val.id,1);
                this.noticeCount = res.data;
            }
        }
    },
    methods: {
        ...mapActions(["getCategoryList", "getUserInfo"]),
        handleScroll() {
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (scrollTop > 130) {
                this.isClarity = false;
                return;
            }
            this.isClarity = true;
        }
    }
};
</script>

<style scoped lang="scss">
.header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
}
.container.pads {
    padding-top: 57px;
}
</style>

