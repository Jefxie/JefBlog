<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
import Editor from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
import { oneOf } from "~/uilts/tools";
import { UploadFileToQiniu, GetQiniuToken } from "~/api/qiniu";
export default {
    name: "Editor",
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
        }
    },
    computed: {
        editorId() {
            return `editor${this._uid}`;
        }
    },
    mounted() {
        this.editor = new Editor(`#${this.editorId}`);

        this.editor.customConfig.onchange = html => {
            let text = this.editor.txt.text();
            if (this.cache) localStorage.editorCache = html;
            this.$emit("input", this.valueType === "html" ? html : text);
            this.$emit("on-change", html, text);
        };
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
        // 初始化七牛上传的方法
        async customUploadImg(files, insert) {
            // 获取七牛鉴权token
            const token = await GetQiniuToken();
            for (const file of files) {
                this.ManyUploadImage(file, token.uptoken, insert);
            }
        },
        async ManyUploadImage(file, token, insert) {
            // 上传图片并获取url
            const res = await UploadFileToQiniu(file, token);
            // 插入url
            insert(res.data[0]);
        }
    }
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";

    .editor-wrapper{
        width: $wrap;
        min-height: 600px;
        margin: 0 auto;
    }
</style>