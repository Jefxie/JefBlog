<template>
    <ul class="readio">
        <template v-for="item in list">
            <li 
            :key="item.id" 
            :style="styles"
            @click="selected(item.id,item.alias)" 
            :class="actived==item.alias?'active':''" 
            class="readio-labe"
            >{{item.name}}</li>
        </template>
    </ul>
</template>
<script>
export default {
    name: "XRadioGrop",
    data() {
        return {
            actived: ""
        };
    },
    props: {
        list: {
            type: Array,
            default: () => [
                {
                    id: "",
                    name: ""
                }
            ]
        },
        alias:{
            type:String,
            default:'all'
        },
        styles:{
            type:String,
            default:''
        }
    },
    watch:{
        alias:{
            handler:function(v,o){
                this.actived = v;
            },
            immediate: true
        }
    },
    methods: {
        selected(id,alias) {
            this.actived = alias;
            this.$emit("active", id);
            this.$emit('aliaser',alias)
        }
    }
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";

.readio {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    &-labe {
        padding: 4px 8px;
        margin-right: 4px;
        margin-bottom: 4px;
        border: 1px solid rgba($color: $jef_red, $alpha: 0.5);
        border-radius: 2px;
        font-size: 12px;
        cursor: pointer;

        &:hover,
        &.active {
            background-color: rgba($color: $jef_red, $alpha: 0.1);
            color: $jef_red;
        }
    }
}
</style>
