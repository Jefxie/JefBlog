<template>
    <div class="plaque">
        <div class="plaque-title"><span>{{title}}</span> | {{alias}}</div>
        <p class="plaque-text">{{text}}</p>
    </div>
</template>
<script>
export default {
    name: "x-plaque",
    props: {
        title: {
            type: String,
            default: "title"
        },
        alias: {
            type: String,
            default: "alias"
        },
        text: {
            type: String,
            default: "text"
        }
    }
};
</script>
<style lang="scss" scoped>
.plaque {
    background-color: #fafafa;
    width: 300px;
    height: 160px;
    padding: 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
    &-title {
        font-size: 36px;
        font-weight: 130;
        color: #bbb;
        span {
            border-bottom: 1px solid rgba($color: #bbb, $alpha: 0.5);
            padding: 5px 0;
        }
    }
    &-text {
        font-size: 18px;
        color: #666;
        line-height: 36px;
    }
}
.plaque:hover {
    box-shadow: 0 0 6px rgba($color: #bbb, $alpha: 0.5);
}
</style>
