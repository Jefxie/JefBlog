<template>
    <div class="list">
        <a href="javascript:void" class="list-title">{{data.title}}</a>
        <p class="list-ctx">{{data.brief}}</p>
        <div class="list-foot">
            <div class="list-foot-l">
                <span class="list-foot-category">{{data.category}}</span>
                <span class="list-foot-author">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yonghu"></use>
                    </svg>
                    {{data.author}}</span>
                <span class="list-foot-time">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shijian"></use>
                    </svg>
                    {{data.create_time | formatTime}}</span>
            </div>
            <div class="list-foot-r">
                <span class="list-foot-comment">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liaotian"></use>
                    </svg>
                    {{data.c_count}}</span>
                <span class="list-foot-likes">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-manyi"></use>
                    </svg>
                    {{data.likes}}</span>
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
export default {
    name: "x-list",
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    id: "article id", //文章id
                    title: "article title", //标题
                    brief: "热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门热门", //文章摘要
                    create_time: "", //创建时间
                    author: "jeff", //作者
                    likes: 100, //点赞数量
                    category: "nodejs", //分类名
                    c_count: "1", //评论数量
                    pv: "100" //阅读量
                };
            }
        }
    },
    filters:{
        formatTime(t){
            return t.slice(0,10)
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
</style>
