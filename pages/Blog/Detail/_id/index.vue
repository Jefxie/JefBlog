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
        <div class="detail-context OneDark" v-html="decodeURIComponent(detailData.content)||''"></div>
            <Divider orientation="center">评论</Divider>
        <div class="detail-comment">
            <div class="detail-comment-remark">
                <div v-if="!userInfo.id" class="detail-comment-remark-login">
                    <button @click="toLogin">登录</button>
                     &nbsp;说说你的看法
                </div>
                <div v-else class="detail-comment-remark-text">
                    <img :src="userInfo.avatar_url" :alt="userInfo.login">
                    <!-- <Input size="small" v-model="commentVal" type="textarea" placeholder="Enter something..." /> -->
                    <div class="detail-comment-remark-input">
                        <textarea v-model="commentVal" @keydown.shift.enter="addComment('')" @focus="isCommitComment = true" @blur="isCommitComment = false" cols="30" rows="10" placeholder="说说你的看法！"></textarea>
                        <div v-show="commentVal||isCommitComment">
                            <span>Shift + Enter or</span>
                            <button @click="addComment('')">评论</button>
                        </div>
                    </div>
                </div>
            </div>
            <x-comment
            :list="commentList"
            @parent="commentEmit" />
        </div>
    </div>
</template>
<script>
import { AddComment } from "~/api/blog";
import date from "~/uilts/date";
import { ToLogin } from "~/api/user";
import { mapActions, mapGetters } from "vuex";
import { Message } from "iview";
import XComment from "~/components/XComment";
export default {
    name: "detail",
    data() {
        return {
            commentVal: "",
            isCommitComment: false
        };
    },
    computed: {
        ...mapGetters(["userInfo", "detailData", "commentList"]),
        createAt() {
            return date(this.detailData.create_at).format("YYYY年MM月DD日");
        }
    },
    components: {
        XComment
    },
    watch: {
        $route: {
            handler: async function(val, old) {
                if (!val.params.id) return;
                const _id = val.params.id.replace(".html", "");
                this.addDetailData(_id);
                this.addCommentList(_id);
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
        ...mapActions(["addDetailData", "addCommentList"]),
        changeVal(obj, key) {
            if (!obj) return "";
            return obj[key];
        },
        toLogin() {
            ToLogin();
        },
        commentEmit(data) {
            this.addComment(data.parent, data.text)
                .then(() => {
                    data.cb(true);
                })
                .catch(() => {
                    data.cb(false);
                });
        },
        async addComment(parent, text) {
            const params = {
                content: text || this.commentVal,
                article_id: this.detailData.id
            };
            if (!params.content) {
                Message.error("请输入评论内容");
                return Promise.reject();
            }
            if (parent) {
                params.parent = parent;
            } else {
                params.cur = this.detailData.author.id;
            }
            try {
                await AddComment(params);
                Message.success("评论成功！");
                this.commentVal = "";
                this.addCommentList(this.$route.params.id.replace(".html", ""));
                return Promise.resolve();
            } catch (error) {
                Message.error("评论错误！");
                return Promise.reject();
            }
        }
    }
};
</script>

<style lang='scss'>
@import "~/assets/styles/variable.scss";
@import "~/components/XMarkdownEditor/css/oneDark.scss";
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

        // p {
        //     margin: 10px 0;
        //     line-height: 28px;
        //     // text-indent:25px
        // }
        // img {
        //     display: block;
        //     margin: 26px auto;
        //     box-shadow: 0 0 6px rgba($color: black, $alpha: 0.3);
        // }
        // /* table 样式 */
        // table {
        //     border-top: 1px solid #ccc;
        //     border-left: 1px solid #ccc;
        // }
        // table td,
        // table th {
        //     border-bottom: 1px solid #ccc;
        //     border-right: 1px solid #ccc;
        //     padding: 3px 5px;
        // }
        // table th {
        //     border-bottom: 2px solid #ccc;
        //     text-align: center;
        // }

        // /* blockquote 样式 */
        // blockquote {
        //     display: block;
        //     border-left: 8px solid #d0e5f2;
        //     padding: 5px 10px;
        //     margin: 10px 0;
        //     line-height: 1.4;
        //     font-size: 100%;
        //     background-color: #f1f1f1;
        // }

        // /* code 样式 */
        // code {
        //     display: inline-block;
        //     *display: inline;
        //     *zoom: 1;
        //     background-color: #f1f1f1;
        //     border-radius: 3px;
        //     padding: 3px 5px;
        //     margin: 0 3px;
        // }
        // pre code {
        //     display: block;
        //     background-color: #f1f1f1;
        // }
        // pre{
        //     overflow: scroll;
        // }
        // /* ul ol 样式 */
        // ul,
        // ol {
        //     margin: 10px 0 10px 20px;
        // }
    }
    &-comment {
        width: 100%;
        padding: 10px;

        &-remark {
            width: 100%;
            padding: 12px;
            min-height: 80px;
            border: 1px solid rgba($color: #999, $alpha: 0.1);
            border-radius: 6px;
            background-color: #f8f9fa;
            text-align: center;
            line-height: 100px;
            &-login {
                button {
                    width: 60px;
                    height: 30px;
                    background-color: $jef_red;
                    border: 1px solid $jef_red;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
            &-text {
                width: 100%;
                display: flex;
                justify-content: space-between;
                img {
                    width: 36px;
                    height: 36px;
                    margin-right: 10px;
                    border-radius: 50%;
                }
            }
            &-input {
                width: 97%;
                line-height: 0;
                & > div {
                    text-align: right;
                    margin-top: 10px;

                    button {
                        width: 60px;
                        height: 30px;
                        margin-left: 10px;
                        background-color: $jef_red;
                        border: 1px solid $jef_red;
                        color: white;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                }
                textarea {
                    width: 100%;
                    height: 70px;
                    border-radius: 4px;
                    border: 1px solid rgba($color: $font_2, $alpha: 0.3);
                    // outline-color: rgba($color: $font_2, $alpha: 0.5);
                    outline: none;
                    resize: none;
                    padding: 10px;
                    &:focus,
                    &:hover {
                        border-color: rgba($color: $jef_red, $alpha: 0.6);
                    }
                }
            }
        }
    }
}
</style>
