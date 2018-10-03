<template>
    <footer class="footer">
        <div class="footer-ctx">
            <div class="footer-ctx-l">
                <h5>小站自述</h5>
                <p>接触前端以来一直想自己设计开发一个博客，用于分想和记录工作、生活和学习中遇到的问题，与解决问题的思路和感悟。
                    于是这个站就运应而生，架构为最典型的NodeJS+MongoDB+Vue，后端使用了Egg框架，前端为NuxtJs服务端渲染，整体比较轻巧简单 \(^o^)/~。</p>
            </div>
            <div class="footer-ctx-m">
                <h5>相关链接</h5>
                <ul>
                    <li><a @click="jumpTo('/about')" href="javascript:void(0)">关于我</a></li>
                    <li><a href="https://m.jef.site">移动端</a></li>
                    <li><a href="https://github.com/jefxie">GitHub</a></li>
                    <li><a href="https://weibo.com/autoshun">微博</a></li>
                </ul>
            </div>
            <div class="footer-ctx-r">
                <h5>
                    <img class="mylogo" src="../assets/images/logo.w.png" alt="Jef.Site（雨夜）">
                    <!-- <svg class="icon mylogo" aria-hidden="true">
                    <use xlink:href="#icon-maotouying"></use>
                    </svg> -->
                </h5>
                <ul>
                    <li><a href="https://github.com/jefxie" target="_blank">
                            <svg class="icon github" aria-hidden="true">
                                <use xlink:href="#icon-github"></use>
                            </svg>
                        </a></li>
                    <li><a href="https://gitee.com/jefxie" target="_blank">
                            <svg class="icon mayun" aria-hidden="true">
                                <use xlink:href="#icon-mayun"></use>
                            </svg>
                        </a></li>
                    <li><a href="https://weibo.com/autoshun" target="_blank">
                            <svg class="icon weibo" aria-hidden="true">
                                <use xlink:href="#icon-icoweibo"></use>
                            </svg>
                        </a></li>
                </ul>
            </div>
        </div>
        <div class="footer-info">
            <a href="https://www.jef.site">&copy; Jef.Site（雨夜）</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">粤ICP备18012800号-2 </a>
        </div>
    </footer>
</template>
<script>
export default {
    name:'xfooter',
    methods:{
        jumpTo(to) {
            this.$router.push(to);
        },
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variable.scss';

.footer {
    width: 100%;
    background-color: #333;
    box-shadow: 0 -2px 12px rgba($color: #333, $alpha: 0.34);
    &-ctx {
        max-width: $wrap;
        height: 190px;
        display: flex;
        color: $font_3;
        margin: 0 auto;
        border-bottom: 1px solid $font_2;
        padding-top: 20px;
        font-size: 14px;
        h5 {
            color: $font_2;
        }
        &-l {
            height: 100%;
            width: 40%;
            padding-right: 60px;
            p {
                line-height: 24px;
            }
        }
        &-m {
            width: 40%;
            // display: flex;
            padding-left: 100px;
            ul,
            li {
                padding: 0;
                margin: 0;
            }
            li {
                line-height: 28px;
            }
        }
        &-r {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            h5 {
                // line-height: 0;
                margin: 0;
            }
            ul {
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: center;
            }
            .mylogo {
                // font-size: 90px;
                width: 90px;
                margin-bottom: 10px;
                transition: 0.2s;
                &:hover {
                    transform: scale(1.2);
                }
            }
            .github {
                font-size: 26px;
                margin-right: 18px;
            }
            .mayun {
                font-size: 26px;
                margin-right: 10px;
            }
            .weibo {
                font-size: 46px;
                line-height: 0;
            }
        }
    }
    &-info {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        font-size: 14px;
        color: #999;
    }
}
</style>
