<template>
    <div class="detail">
        <h1>{{detailData.title}}</h1>
        <div class="detail-info">
            <div class="detail-info-user">
                <Avatar icon="ios-person" shape="circle" :src="changeVal(detailData.author,'avatar_url')" size="small" />
                <span class="detail-info-user-name">{{changeVal(detailData.author,'name')}}</span>
                <Tag color="red">{{changeVal(detailData.category,'name')}}</Tag>
            </div>
            <div class="detail-info-pv">
                <span>{{createAt}}</span>
                <!-- <Icon type="md-eye" /> -->

                {{" 阅读："+detailData.pv}}
            </div>
        </div>
        <div class="detail-context" v-html="decodeURIComponent(detailData.content)||''">

        </div>
    </div>
</template>
<script>
import { GetArticleDetail } from "~/api/blog";
import date from "~/uilts/date";

export default {
    name: "detail",
    data() {
        return {
            detailData: {}
        };
    },
    computed: {
        createAt() {
            return date(this.detailData.create_at).format("YYYY年MM月DD日");
        }
    },
    watch: {
        $route: {
            handler: async function(val, old) {
                if (!val.params.id) return;
                // this.initArticleList();
                const _id = val.params.id.replace(".html", "");
                const res = await GetArticleDetail(_id);
                this.detailData = res.data;
            },
            immediate: true
        }
    },
    head() {
        return {
            title: this.detailData.title,
            meta: [
                {
                    hid: "detail",
                    name: "detail",
                    content: "文章详情,Jef.site 雨夜客栈(博客)"
                }
            ]
        };
    },
    methods: {
        changeVal(obj, key) {
            if (!obj) return "";
            return obj[key];
        },
    }
};
</script>

<style lang='scss'>
@import "~/assets/styles/variable.scss";
// code 表格等样式

.detail {
    width: $wrap_s;
    margin: 30px auto;
    &-info {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        &-user {
            &-name {
                margin-left: 6px;
                margin-right: 20px;
            }
        }
    }
    &-context {
        margin-top: 20px;
        font-size: 16px;
        p {
            margin: 10px 0;
            line-height: 28px;
            // text-indent:25px
        }
        img {
            display: block;
            margin: 26px auto;
            box-shadow: 0 0 6px rgba($color: black, $alpha: 0.3);
        }
        /* table 样式 */
        table {
            border-top: 1px solid #ccc;
            border-left: 1px solid #ccc;
        }
        table td,
        table th {
            border-bottom: 1px solid #ccc;
            border-right: 1px solid #ccc;
            padding: 3px 5px;
        }
        table th {
            border-bottom: 2px solid #ccc;
            text-align: center;
        }

        /* blockquote 样式 */
        blockquote {
            display: block;
            border-left: 8px solid #d0e5f2;
            padding: 5px 10px;
            margin: 10px 0;
            line-height: 1.4;
            font-size: 100%;
            background-color: #f1f1f1;
        }

        /* code 样式 */
        code {
            display: inline-block;
            *display: inline;
            *zoom: 1;
            background-color: #f1f1f1;
            border-radius: 3px;
            padding: 3px 5px;
            margin: 0 3px;
        }
        pre code {
            display: block;
            background-color: #f1f1f1;
        }
        pre{
            overflow: scroll;
        }
        /* ul ol 样式 */
        ul,
        ol {
            margin: 10px 0 10px 20px;
        }
    }
}
</style>
