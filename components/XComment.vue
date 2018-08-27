<template>
    <ul class="comment">
        <li class="comment-li" v-for="item in list" :key="item.id">
            <img @click="jumpTo(item.author.login)" :src="item.avatar_url" :alt="item.author.login">
            <div class="comment-content">
                <div class="comment-content-name">{{item.author.name}}</div>
                <div class="comment-content-text">
                    <i v-if="item.parent" @click="jumpTo(item.parent.login)">@{{item.parent.name}}</i>
                    {{item.content}}
                </div>
                <div class="comment-content-more">
                    <i>{{formatDate(item.create_at)}}</i>
                    <span v-if="userInfo.id" @click="showCommentInput(item.id)">
                        {{commentParmam === item.id?'收起':'回复'}}
                    </span>
                    <Poptip
                        confirm
                        title="真的要删除这条评论吗?"
                        :transfer="true"
                        @on-ok="poptipOk(item.id)"
                        >
                        <!-- <Button>Delete</Button> -->
                        <span v-if="item.author.id === userInfo.id">删除</span>
                    </Poptip>
                </div>
                <div v-show="commentParmam === item.id" class="comment-content-input">
                    <input v-model="commentText" type="text">
                    <button @click="addComment(item.author.id)">回复</button>
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
import date from "~/uilts/date";
import { mapActions, mapGetters } from "vuex";
export default {
    name: "xcomment",
    data() {
        return {
            commentParmam: "",
            commentText: ""
        };
    },
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        ...mapGetters(["userInfo"])
    },
    methods: {
        ...mapActions(["deleteComment"]),
        formatDate(t) {
            return date(t).format("YYYY-MM-DD HH:mm:ss");
        },
        addComment(id) {
            this.$emit("parent", {
                parent: id,
                text: this.commentText,
                cb: this.emitCallback
            });
        },
        emitCallback(ok) {
            if (ok) {
                this.commentParmam = "";
                this.commentText = "";
            }
        },
        showCommentInput(id) {
            if (this.commentParmam) {
                this.commentParmam = "";
                return;
            }
            this.commentParmam = id;
        },
        jumpTo(target) {
            this.$router.push("/user/" + target);
        },
        poptipOk(id) {
            // console.log(is)
            this.deleteComment(id);
        }
    }
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";

.comment {
    width: 100%;

    &-li {
        width: 100%;
        display: flex;
        // padding: 10px 0;
        img {
            width: 36px;
            height: 36px;
            margin-top: 12px;
            margin-right: 10px;
            border-radius: 50%;
            cursor: pointer;
        }
    }
    &-content {
        width: 100%;
        // padding: 20px 0;
        padding-top: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba($color: $jef_red, $alpha: 0.1);

        &-name {
            font-size: 16px;
            font-weight: bold;
        }
        &-text {
            margin-top: 10px;
            font-size: 14px;
            i {
                color: $jef_red;
                cursor: pointer;
            }
        }
        &-more {
            padding-top: 10px;

            i {
                font-style: normal;
            }
            span {
                cursor: pointer;
                margin-left: 10px;
                &:hover {
                    color: $jef_red;
                }
            }
        }
        &-input {
            display: flex;
            width: 100%;
            margin: 4px 0;
            input {
                width: 100%;
                height: 30px;
                padding: 10px;
                margin-right: 6px;
                border: 1px solid $jef_red;
                border-radius: 2px;
            }
            button {
                width: 60px;
                height: 30px;
                background-color: $jef_red;
                color: #fff;
                border-radius: 2px;
            }
        }
    }
}
</style>
