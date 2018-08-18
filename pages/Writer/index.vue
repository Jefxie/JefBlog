<template>
    <div class="writer">
        <div class="writer-head">
            <input v-model="article.title" class="writer-title" type="text" placeholder="请输入标题">
            <Poptip 
                title="选择分类并发布"
                trigger="click"
                content="" 
                placement="bottom-end"
                :transfer="true" >
                    <div class="writer-release">
                        发布
                        <Icon type="md-arrow-dropdown" />
                    </div>
                    <div class="writer-category" slot="content">
                        <div class="writer-category-grop">
                            <x-radio-grop
                            :list="categoryList"
                            @active="onCategory" />
                        </div>
                        <button @click="toRelease" class="writer-category-enter">确认发布</button>
                    </div>
                </Poptip>
        </div>
        <x-editor
        :value="article.content"
        @input="editorContent" />
    </div>
</template>
<script>
import XEditor from "~/components/XEditor";
import { mapGetters, mapActions } from "vuex";
import XRadioGrop from "~/components/XRadioGrop";
import { Message } from "iview";
import Cookies from "js-cookie";
export default {
    name: "writer",
    data() {
        return {
            article: {
                title: "",
                category: "",
                abstract: "",
                content: ""
            }
        };
    },
    components: {
        XEditor,
        XRadioGrop
    },
    computed: {
        ...mapGetters(["categoryList"])
    },
    head() {
        return {
            title: "编写文章",
            meta: [
                {
                    hid: "writer",
                    name: "writer",
                    content: "编写文章 Jef.site 雨夜客栈(博客)"
                }
            ]
        };
    },
    methods: {
        ...mapActions(["addArticle"]),
        onCategory(id) {
            this.article.category = id;
        },
        editorContent(ctx) {
            this.article.content = ctx;
            this.sliceAbstract(ctx);
        },
        sliceAbstract(html) {
            const _start = html.indexOf("<p>");
            const _end = html.indexOf("</p>");
            if (_start == -1 || _end == -1) return;
            this.article.abstract = html.slice(_start + 3, _end);
        },
        toRelease() {
            for (const key in this.article) {
                if (!this.article[key]) {
                    Message.error(`${key}项未填写!`);
                    return;
                }
            }
            this.addArticle(this.article)
                .then(() => {
                    Message.success("添加成功！");
                    Cookies.remove("editorCache");
                })
                .catch(() => {
                    Message.error("添加失败！");
                });
        }
    }
};
</script>
<style scoped lang="scss">
@import "~/assets/styles/variable.scss";

.writer {
    width: $wrap;
    margin: 10px auto;

    &-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 35px;
        margin: 6px 0;
        font-size: 16px;
    }
    &-release {
        width: 70px;
        text-align: center;
        color: $jef_red;
        cursor: pointer;
    }
    &-title {
        flex: 1;
        height: 100%;
        padding-left: 10px;
        border: 1px solid rgba($color: $font_3, $alpha: 0.3);
        font-size: 14px;
    }
    &-category {
        width: 300px;

        &-enter {
            display: block;
            width: 90px;
            height: 30px;
            margin: 0 auto;
            margin-top: 10px;
            background-color: $jef_red;
            color: white;
            border-radius: 4px;
            cursor: pointer;
        }
    }
}
</style>
