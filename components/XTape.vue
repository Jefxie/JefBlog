<template>
    <div class="tape" :style="`height:${h}px;`">
        <div :class="revers?'tape-wrap revers':'tape-wrap'" :style="`transition:${time};width:${start?'100%':'0'};`"></div>
    </div>
</template>
<script>
export default {
    name: "x-tape",
    props: {
        revers: {
            type: Boolean,
            default: false
        },
        time: {
            type: String,
            default: ".5s"
        },
        h: {
            type: Number,
            default: 1
        },
        start:{
          type:Boolean,
          default:false  
        }
    }
};
</script>
<style lang="scss" scoped>
.tape {
    position: relative;
    width: 100%;
    height: 1px;
    &-wrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background: linear-gradient(left,red,blue);
        transition: 0.5s;
        &.revers {
            // text-align: right;
            right: 0;
            left: initial;
        }
    }
}
</style>
