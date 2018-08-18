<template>
  <div>
    <header class="header">
      <x-header
        :clarity="isHome&&isClarity" 
        :headers='headers'
        :active="curPath"
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
import { mapActions } from "vuex";
export default {
    name: "layout",
    data() {
        return {
            isClarity: true,
            isHome: false,
            curPath: "",
            headers: [
                {
                    name: "首页",
                    path: "/"
                },
                {
                    name: "博客",
                    path: "/blog"
                },
                {
                    name: "Pwa",
                    path: "/pwa"
                }
            ]
        };
    },
    components: {
        XHeader,
        XFooter
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
            handler: function(val, old) {
                this.getUserInfo();

                this.curPath = val.path;
                if (val.path === "/") {
                    this.isHome = true;
                    return;
                }
                this.isHome = false;
            },
            immediate: true
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

