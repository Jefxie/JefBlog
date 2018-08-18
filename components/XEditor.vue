<template>
  <div class="editor-wrapper">
    <div :id="barId" class="editor-bar"></div>
    <div :id="editorId" class="editor-ctx"></div>
  </div>
</template>

<script>
import Editor from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
import { oneOf } from "~/uilts/tools";
import { UploadFileToQiniu, GetQiniuToken } from "~/api/qiniu";
export default {
    name: "xEditor",
    props: {
        value: {
            type: String,
            default: ""
        },
        /**
         * 绑定的值的类型, enum: ['html', 'text']
         */
        valueType: {
            type: String,
            default: "html",
            validator: val => {
                return oneOf(val, ["html", "text"]);
            }
        },
        /**
         * @description 设置change事件触发时间间隔
         */
        changeInterval: {
            type: Number,
            default: 200
        },
        /**
         * @description 是否开启本地存储
         */
        cache: {
            type: Boolean,
            default: true
        },
        // 图片处理样式
        imgStyle: {
            type: String,
            default:
                "imageMogr2/auto-orient/thumbnail/650x650>/format/webp/blur/1x0/quality/80|watermark/1/image/aHR0cDovL2ltYWdlLmplZi5zaXRlL2xvZ29fdzUwLnBuZw==/dissolve/30/gravity/SouthEast/dx/10/dy/10"
        }
    },
    computed: {
        editorId() {
            return `editor${this._uid}`;
        },
        barId() {
            return `bar${this._uid}`;
        }
    },
    mounted() {
        this.editor = new Editor(`#${this.barId}`,`#${this.editorId}`);

        this.editor.customConfig.onchange = html => {
            let text = this.editor.txt.text();
            if (this.cache) localStorage.editorCache = html;
            this.$emit("input", this.valueType === "html" ? html : text);
            this.$emit("on-change", html, text);
        };
        this.editor.customConfig.zIndex = 2;

        this.editor.customConfig.onchangeTimeout = this.changeInterval;
        // 自定义上传事件
        this.editor.customConfig.customUploadImg = this.customUploadImg;
        // create这个方法一定要在所有配置项之后调用
        this.editor.create();
        // 如果本地有存储加载本地存储内容
        let html = localStorage.editorCache;
        if (html) this.editor.txt.html(html);
    },
    methods: {
        // 七牛上传的方法
        async customUploadImg(files, insert) {
            // 获取七牛鉴权token
            const res = await GetQiniuToken();
            for (const file of files) {
                this.ManyUploadImage(file, res.token, insert);
            }
        },
        async ManyUploadImage(file, token, insert) {
            // 上传图片并获取url
            const res = await UploadFileToQiniu(file, token);
            const _img = res.data + this.imgStyle;
            // 插入url
            insert(_img);
        }
    }
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";

.editor-wrapper {
    width: 100%;
    min-height: 600px;
    
}
.editor{
    &-bar{
        background-color: $bg_1;
    }
    &-ctx{
        min-height: 600px;
        border: 1px solid rgba($color: $font_3, $alpha: .3);
        background-color: $bg_2;
        font-size: 14px;
    }
}

</style>