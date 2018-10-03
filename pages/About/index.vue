<template>
    <div class="about">
        <!-- <x-line text="谢小舜" /> -->
        <img class="about-we" src="http://image.jef.site/FqKwQz3-_tj3JxK9SJyAoy46Yhex" alt="">
        <x-line text="关于博客" />
        <p>
            接触前端以来一直想自己设计开发一个博客，一来是为了练手，还可以用于分想和记录工作、生活和学习中遇到的问题，与解决问题的思路和感悟。
            于是18年初就开始动手写了一版，第一版后台用KOA2+Postgresql （<a href="https://github.com/Jefxie/blog-server2">GitHub地址</a>）,前端vue，当时的图片服务器使用是自己手动写的
            （<a href="https://github.com/Jefxie/image-server">GitHub地址</a>），基本功能算是有了 但还是有点不满意，于是就动手写了现在这一版，
            选择架构时也是因为Egg是一个非常优秀的Nodejs框架想通过重构博客系统来体验一下，数据库方面选择MongoDB，因为之前已知是在用Poostgresql，也是为了体验下MongoDB
            所以确定为最典型的NodeJS+MongoDB+Vue，而前端为考虑到对SEO的友好于是就选择了NuxtJs来做服务端渲染，花了一周时间终于搞定了
            整体比较轻巧简单，下面是简单整理的架构图 \(^o^)/~。

        </p>
        <x-line text="博客架构图" />
        <img src="http://image.jef.site/Fslwu_k05kERIV9It4aUZhpdQNRT" alt="">
    </div>
</template>
<script>
import XLine from '~/components/XLine';

export default {
    name: 'about',
    components: {
        XLine,
    },
};
</script>

<style scoped lang="scss">
@import '~/assets/styles/variable.scss';
.about {
    width: $wrap_m;
    margin: 0 auto;
    &-we {
        margin-bottom: 30px;
        margin-top: 20px;
    }
    img {
        width: 100%;
    }
    p {
        font-size: 14px;
    }
}
</style>

