<template>
    <div class="xslider">
        <Carousel :height="carHeight" autoplay v-model="slideVal" loop>
            <CarouselItem>
                <div class="xslider-page">1</div>
            </CarouselItem>
            <CarouselItem>
                <div class="xslider-page">2</div>
            </CarouselItem>
            <CarouselItem>
                <div class="xslider-page">3</div>
            </CarouselItem>
            <CarouselItem>
                <div class="xslider-page">4</div>
            </CarouselItem>
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
        height: 100%;
        background-color: skyblue;
    }
}
</style>

