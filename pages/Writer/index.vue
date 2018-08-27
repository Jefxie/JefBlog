<template>
    <div class="writer">
        <div class="writer-head">
            <div class="writer-change">
                <Icon v-show="!isMarkdown" @click="isMarkdown = !isMarkdown" type="logo-markdown" />
                <Icon v-show="isMarkdown" @click="isMarkdown = !isMarkdown" type="md-paper" />
                <p>{{isMarkdown?'富文本':'Markdown'}}</p>
            </div>
            <input v-model="article.title" class="writer-title" type="text" placeholder="请输入标题">
            <!-- <button>切换富文本</button> -->
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
        <div v-if="!isMarkdown">
            <x-editor
            :value="article.content"
            @input="editorContent" 
            />
        </div>
        <div v-else class="writer-markdown">
            <x-markdown-editor
            :height="700"
            actions="http://upload-z2.qiniup.com"
            theme="OneDark"
            :handler="markdownHandler"
            :initialValue="markdownInitVal"
            @on-save="markdownSave"
            @getMarkdown="editorContent"
            />
        </div>
        
    </div>
</template>
<script>
import XEditor from "~/components/XEditor";
import { mapGetters, mapActions } from "vuex";
import XRadioGrop from "~/components/XRadioGrop";
import XMarkdownEditor from "~/components/XMarkdownEditor/index";
import { GetQiniuToken } from "~/api/qiniu";
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
            },
            isMarkdown: true,
            markdownInitVal: ""
        };
    },
    components: {
        XEditor,
        XRadioGrop,
        XMarkdownEditor
    },
    created() {
        this.markdownInitVal = decodeURIComponent(
            localStorage.MarkdownContentCach
        );
        const _article = Cookies.get("_article");
        this.article.title = _article;
    },

    computed: {
        ...mapGetters(["categoryList"]),
        markdownHandler() {
            return {
                start: this.markdownUploadImageStart,
                end: this.markdownUploadImageEnd
            };
        }
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
        async markdownUploadImageStart() {
            try {
                const res = await GetQiniuToken();
                return Promise.resolve({
                    token: res.token
                });
            } catch (error) {
                return reject(error);
            }
        },
        markdownUploadImageEnd(_data) {
            return Promise.resolve({
                data:
                    _data.data +
                    "?imageMogr2/auto-orient/thumbnail/650x650>/format/webp/blur/1x0/quality/80|watermark/1/image/aHR0cDovL2ltYWdlLmplZi5zaXRlL2xvZ29fdzUwLnBuZw==/dissolve/30/gravity/SouthEast/dx/10/dy/10"
            });
        },
        markdownSave(e) {
            localStorage.MarkdownContentCach = encodeURIComponent(
                e.markdownValue
            );
            Cookies.set("_article", this.article.title);
        },
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
                    Cookies.remove("_article");
                    window.localStorage.removeItem("MarkdownContentCach");
                    window.localStorage.removeItem("editorCache");
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
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 35px;
        margin: 6px 0;
        font-size: 16px;
    }
    &-change {
        position: absolute;
        left: -80px;
        top: 0;
        text-align: center;
        font-size: 32px;
        cursor: pointer;
        p {
            font-size: 14px;
        }
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
    &-markdown {
        border: 1px solid rgba($color: $font_3, $alpha: 0.3);
    }
}
</style>
