<template>
        <ul class="aside">
            <!-- <div class="aside-tape" :key="i">
                    <x-tape 
                    :start="tapeStart===undefined"
                    :revers="true">
                    </x-tape>
                </div> -->
            <li @click="changeActive(undefined)" @mouseover="changeCur(undefined)" @mouseout="changeCur('c')" :class="activeIndex===undefined?'active':''">全部</li>
            <div class="aside-tape">
                    <x-tape 
                    :start="tapeStart===undefined">
                    </x-tape>
                </div>
            <template v-for="(item,i) in list">
                <!-- <div class="aside-tape" :key="i">
                    <x-tape 
                    :start="tapeStart===i"
                    :revers="true">
                    </x-tape>
                </div> -->
                <li @click="changeActive(i,item)" @mouseover="changeCur(i)" @mouseout="changeCur('c')" :class="activeIndex===i?'active':''" :key="i">{{item.name}}</li>
                <div class="aside-tape" :key="i">
                    <x-tape 
                    :start="tapeStart===i">
                    </x-tape>
                </div>
            </template>
        </ul>
</template>
<script>
import XTape from "~/components/XTape";
import { all } from 'async';

export default {
    name: "x-aside",
    data() {
        return {
            activeIndex: undefined,
            tapeStart: "c"
        };
    },
    components: {
        XTape
    },
    methods: {
        changeActive(i, p={}) {
            this.activeIndex = i;
            this.$emit("aside", { id: p.id||'', alias: p.alias||'' });
        },
        changeCur(i) {
            this.tapeStart = i;
        }
    },
    props: {
        list: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style scoped lang="scss">
.aside {
    width: 100%;
    border-left: 1px solid #000;
    &-tape {
        width: 100%;
        padding: 0 10px;
    }

    li {
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #333;
        padding-left: 24px;
        box-sizing: border-box;
        border-left: 1px solid transparent;
        cursor: pointer;
        &.active {
            // border-left-width: 3px;
            border-left-color: #000;
        }
    }
}
</style>

