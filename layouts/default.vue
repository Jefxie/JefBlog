<template>
  <div>
    <header class="header">
      <x-header
        :clarity="isHome&&isClarity" 
      />
    </header>
    <div class="container" :class="isHome?'':'pads'">
      <nuxt/>
    </div>
    <x-footer />
  </div>
</template>
<script>
import XHeader from "~/components/XHeader";
import XFooter from "~/components/XFooter";
import { mapActions } from "vuex";
export default {
    name: "layout",
    data() {
        return {
            isClarity: true,
            isHome: false
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
        ...mapActions(["getCategoryList"]),
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

<style>
.header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
.container.pads {
    padding-top: 60px;
}
</style>

