<template>
    <div class="detail">
        <h1>{{detailData.title}}</h1>
        <div class="detail-context" v-html="decodeURIComponent(detailData.content)||''">

        </div>
    </div>
</template>
<script>
import {GetArticleDetail} from "~/api/blog";
export default {
    name: "detail",
    data() {
        return {
            detailData: {}
        };
    },
    watch: {
        $route: {
            handler: async function(val, old) {
                if (!val.params.id) return;
                // this.initArticleList();
                const _id = val.params.id.replace('.html','');
                const res = await GetArticleDetail(_id);
                this.detailData = res.data;
            },
            immediate: true
        }
    }
};
</script>

<style scoped lang='scss'>
@import "~/assets/styles/variable.scss";
.detail {
    width: $wrap_s;
    margin: 30px auto;
}
</style>
