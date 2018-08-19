<template>
    <div class="xslider">
        <Carousel :height="carHeight" autoplay v-model="slideVal" loop>
            <template v-for="(item,i) in list">
                <CarouselItem :key="i">
                    <a class="xslider-page" :href="item.target" :style="`background-image:url('${item.src}')`">
                    </a>
                </CarouselItem>
            </template>
        </Carousel>
    </div>
</template>
<script>
export default {
    name: "xslider",
    data() {
        return {
            slideVal: 0,
            carHeight:270
        };
    },
    props:{
        list:{
            type:Array,
            default:()=>[
                {
                    src:'',
                    target:''
                }
            ]
        }
    }

};
</script>
<style scoped lang="scss">
@import "~/assets/styles/variable.scss";

.xslider {
    width: 100%;
    height: 270px;
    border-radius: 6px;
    overflow: hidden;
    &-page {
        display: block;
        height: 100%;
        width: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
}
</style>
