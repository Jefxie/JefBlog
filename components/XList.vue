<template>
    <div class="list">
        <a href="javascript:void" class="list-title" @click="emitTo">{{data.title}}</a>
        <p class="list-ctx">{{data.abstract}}</p>
        <div class="list-foot">
            <div class="list-foot-l">
                <span @click="jumpTo('/blog/'+data.category.alias)" class="list-foot-category point">{{data.category.name}}</span>
                <span class="list-foot-author point" @click="jumpTo('/user/'+data.author.login)">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yonghu"></use>
                    </svg>
                    {{data.author.name}}</span>
                <span class="list-foot-time">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shijian"></use>
                    </svg>
                    {{data.create_at | formatTime}}</span>
            </div>
            <div class="list-foot-r">
                <span class="list-foot-comment">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liaotian"></use>
                    </svg>
                    {{data.c_count||0}}</span>
                <!-- <span class="list-foot-likes">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-manyi"></use>
                    </svg>
                    {{data.likes}}</span> -->
                <span class="list-foot-pv">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-kejian"></use>
                    </svg>
                    {{data.pv}}</span>

            </div>
        </div>
    </div>
</template>
<script>
import date from "~/uilts/date";
export default {
    name: "x-list",
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    id: "", //文章id
                    title: "", //标题
                    abstract: "", //文章摘要
                    create_at: "", //创建时间
                    author: "jef", //作者
                    // likes: 100, //点赞数量
                    category: "nodejs", //分类名
                    c_count: "1", //评论数量
                    pv: "100" //阅读量
                };
            }
        }
    },
    filters: {
        formatTime(t) {
            return date(t).format("YYYY-MM-DD HH:mm:ss");
        }
    },
    methods: {
        emitTo() {
            this.$emit("detail", this.data.id);
        },
        jumpTo(to) {
            this.$router.push(to);
        }
    }
};
</script>

<style scoped lang="scss">
.list {
    width: 100%;
    padding: 16px 0;
    border-bottom: 1px solid rgba($color: #bbb, $alpha: 0.5);
    color: #333;
    &-title {
        font-size: 20px;
    }
    &-ctx {
        font-size: 14px;
        // line-height: 28px;
        margin: 6px 0;
        color: #999;
    }
    &-foot {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-size: 14px;
        color: #666;

        svg {
            font-size: 14px;
        }

        &-l {
            span + span {
                padding-left: 14px;
            }
        }
        &-r {
            span + span {
                padding-left: 14px;
            }
        }
    }
}
.point{
    cursor: pointer;
}
</style>
