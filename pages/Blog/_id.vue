<template>
    <div class="blog">
        <div class="blog-content">
            <x-slide :list="slide" />
            <template v-for="(item,i) in articleList[paramsId]||[]">
                <x-list :key="i" :data="item" @detail="goToDetail" />
            </template>
            <div class="blog-more">
                <button v-if="isLoading" @click="loadMore">加载更多</button>
            </div>
        </div>
        <div class="blog-bar">
            
            <h3 class="blog-bar-title">
                <Icon type="ios-keypad" />
                &nbsp;标签分类
            </h3>
            <x-sidebar :list="categoryList" :active="paramsId" />
            <h3 class="blog-bar-title">
                <Icon type="ios-keypad" />
                &nbsp;体验小程序
            </h3>
            <div class="blog-bar-mp">
                <img src="../../assets/images/mp.jpg" alt="小程序">
            </div>
            <!-- <div class="blog-bar-logo">
                <img src="../../assets/images/logo.r.png" alt="">
                <span>雨夜</span>
            </div> -->
            <div class="blog-bar-github">
                <x-github />
            </div>
        </div>
    </div>
</template>
<script>
import XSidebar from '~/components/XSidebar';
import XSlide from '~/components/XSlider';
import XList from '~/components/XList';
import XGithub from '~/components/XGithub';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'blog',
    data() {
        return {
            paramsId: 'all',
            pages: {},
            slide: [
                {
                    src:
                        'http://hbfile.b0.upaiyun.com/img/home/banner/1bc004d49cb173857cf75507141a33a0070e7a831040a6',
                    target: '/',
                },
                {
                    src:
                        'http://hbfile.b0.upaiyun.com/img/home/banner/cdf0a6ab627bc33af759533af558a118be5a1b1dd2d93',
                    target: '/',
                },
                {
                    src:
                        'http://img.hb.aicdn.com/85a73d8b40798b16d18a560fe60a0dfb2b00ad334f9c6-t3oGRG_fw658',
                    target: '/',
                },
            ],
        };
    },
    components: {
        XSidebar,
        XSlide,
        XList,
        XGithub,
    },
    computed: {
        ...mapGetters(['categoryList', 'articleList']),
        categoryId() {
            if (
                !Object.prototype.toString
                    .call(this.categoryList)
                    .includes('Array')
            )
                return '';
            const len = this.categoryList.length || 0;
            for (let i = 0; i < len; i++) {
                if (this.categoryList[i].alias == this.paramsId) {
                    return this.categoryList[i].id;
                }
            }
            return '';
        },
        isLoading() {
            if (
                this.articleList[this.paramsId] &&
                this.articleList[this.paramsId].length >= 10
            )
                return true;

            return false;
        },
    },
    created() {
        // this.initArticleList();
    },
    watch: {
        $route: {
            handler: function(val, old) {
                this.paramsId = val.params.id || 'all';
                this.initArticleList();
            },
            immediate: true,
        },
    },
    head() {
        return {
            title: '博客|分类|' + this.paramsId,
            meta: [
                {
                    hid: this.paramsId,
                    name: this.paramsId,
                    content: 'Jef.site 雨夜客栈(博客)',
                },
            ],
        };
    },
    methods: {
        ...mapActions(['getArticleList']),
        initArticleList(ispush = false, page = 1, total = 10) {
            this.getArticleList({
                category: this.categoryId,
                key: this.paramsId,
                ispush,
                total,
                page,
            });
        },
        loadMore() {
            const _page = this.pages[this.paramsId]
                ? ++this.pages[this.paramsId]
                : (this.pages[this.paramsId] = 2);
            this.initArticleList(true, _page);
        },
        goToDetail(id) {
            this.$router.push('/blog/detail/' + id + '.html');
        },
    },
};
</script>

<style scoped lang="scss">
@import '~/assets/styles/variable.scss';
.blog {
    display: flex;
    justify-content: space-between;
    width: $wrap_m;
    margin: 22px auto;
    min-height: 800px;

    &-content {
        width: $content;
    }
    &-bar {
        width: $slide;
        padding: 0 10px;
        &-mp{
            width: 100%;
            padding: 20px 30px;
            img{
                width: 100%;
            }
        }
        &-logo {
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            // border: 1px solid $jef_red;
            border-radius: 6px;
            box-shadow: 0 0 6px rgba($color: $font_3, $alpha: 0.3);
            cursor: pointer;
            span {
                font-size: 50px;
                margin-left: 10px;
            }
            img {
                height: 53%;
            }
        }
        &-github {
            width: 100%;
        }
        &-title {
            color: $font_3;
        }
    }
    &-more {
        width: 100%;
        height: 100px;
        // background-color: $bg_2;
        text-align: center;
        line-height: 100px;

        button {
            width: 110px;
            height: 34px;
            line-height: 34px;
            border-radius: 4px;
            background-color: transparent;
            border: 1px solid $jef_red;
            color: $jef_red;
            cursor: pointer;
            transition: 0.1s;
            &:hover {
                background-color: $jef_red;
                color: white;
            }
        }
    }
}
</style>
