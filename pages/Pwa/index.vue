<template>
    <div class="pwa">
        <div class="pwa-box">
            <iframe :src="iframeSrc" frameborder="0" seamless></iframe>
        </div>
    </div>
</template>
<script>
export default {
    name: 'pwa',
    computed: {
        iframeSrc() {
            return this.$route.query.src || '';
        },
    },
};
</script>
<style lang="scss" scoped>
.pwa {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 50px 0;
    &-box {
        position: relative;
        width: 431px;
        height: 840px;
        padding: 84px 30px 27px 28px;
        background: url('../../assets/images/iphoneX.png') no-repeat center/100%;

        iframe {
            width: 100%;
            height: 100%;
            border: 1px solid #edf0f4;
            border-bottom-right-radius: 30px;
            border-bottom-left-radius: 30px;
            overflow: hidden;
        }
    }
}
</style>

