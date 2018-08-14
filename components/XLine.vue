<template>
    <div class="line">
        <span></span>
        <p class="line-text">{{text}}</p>
        <span></span>
    </div>
</template>
<script>
    export default {
        name:'x-line',
        props:{
            text:{
                type:String,
                default:'text'
            }
        }
    }
</script>
<style lang='scss' scoped>
@import "~/assets/styles/variable.scss";

    .line{
        max-width: $wrap;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        &-text{
            color: #999;
        }
        span{
            height: 1px;
            width: 45%;
            background-color: $jef_red;
            opacity: .2;
        }
    }
</style>
