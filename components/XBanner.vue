<template>
    <div class="banner" :style="`background:url('${bannerBg}') no-repeat center/cover;`">
        <div class="banner-sc">
            <x-search></x-search>
        </div>
    </div>
</template>
<script>
import XSearch from '~/components/XSearch'
    export default {
        name:'x-banner',
        data(){
            return {
                bannerBg:'//hbfile.b0.upaiyun.com/img/home/banner/97d8ff820f692ab31bb02e701d27517db55fd39ad26c0'
            };
        },
        components:{
            XSearch
        }
    }
</script>
<style lang="scss" scoped>
    .banner{
        width: 100%;
        height: 500px;
        background: url() no-repeat center/cover;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &-sc{
            // margin: 0 auto;
        }
    }
</style>
