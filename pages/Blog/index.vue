<template>
    <div class="blog">
        <div class="blog-content">
            <x-slide />
            <x-list />
            <x-list />
        </div>
        <div class="blog-bar">
            <h3 class="blog-bar-title"><Icon type="ios-keypad" />&nbsp;文章分类</h3>
            <x-sidebar 
            :list="categoryList" />
        </div>
    </div>
</template>
<script>
import XSidebar from "~/components/XSidebar";
import XSlide from "~/components/XSlider";
import XList from "~/components/XList";
import {mapGetters} from 'vuex';
export default {
    name: "blog",
    components: {
        XSidebar,
        XSlide,
        XList
    },
    computed:{
        ...mapGetters(["categoryList"])
    }
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";
.blog {
    display: flex;
    justify-content: space-between;
    width: $wrap_m;
    margin: 22px auto;
    min-height: 800px;

    &-content {
        width: $content;
    }
    &-bar {
        width: $slide;
        padding: 0 10px;

        &-title {
            color: $font_3;
            // border-left: 3px solid $jef_red;
        }
    }
}
</style>
