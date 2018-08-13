<template>
    <div class="search">
        <input @keydown.down="onKeyDown" @keydown.up="onKeyUp" @keydown.enter="onEnter" @blur="resIsShow=false" class="search-box" type="text" placeholder="搜索你喜欢的" v-model="inputVal">
        <svg class="icon search-icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
        </svg>
        <ul class="search-res" v-show="resIsShow">
            <template v-for="(item,i) in searchRes">
                <li @mouseover="changeAvtive(i)" :class="activeIndex===i?'active':''" :key="i">{{item.name}}</li>
            </template>
        </ul>
    </div>
</template>
<script>
export default {
    name: "x-search",
    data() {
        return {
            inputVal: "",
            searchRes: [
                {
                    id: "akhsjdkjahsd",
                    name: "nodejs"
                },
                {
                    id: "akhsjdkjahsd",
                    name: "nodejs"
                },
                {
                    id: "akhsjdkjahsd",
                    name: "nodejs"
                }
            ],
            activeIndex: undefined,
            resIsShow: false
        };
    },
    methods: {
        changeAvtive(i) {
            this.activeIndex = i;
        },
        onKeyDown() {
            const len = this.searchRes.length;
            const i = this.activeIndex;
            if (i === undefined || i === len - 1) {
                this.activeIndex = 0;
                return;
            }
            this.activeIndex++;
        },
        onKeyUp() {
            const len = this.searchRes.length;
            const i = this.activeIndex;
            if (i === undefined || i === 0) {
                this.activeIndex = len - 1;
                return;
            }
            this.activeIndex--;
        },
        onEnter() {
            console.log("enter");
        }
    },
    watch: {
        inputVal: function(val, old) {
            if (val && !this.resIsShow) {
                this.resIsShow = true;
            }
            if (!val) {
                this.resIsShow = false;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.search {
    position: relative;
    font-size: 14px;
    &-box {
        width: 560px;
        height: 45px;
        border-radius: 4px;
        padding-left: 10px;
        color: #333;
        
    }
    &-icon {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 22px;
        color: #666;
    }
    &-res {
        width: 100%;
        position: absolute;
        top: 46px;
        left: 0;
        border-radius: 4px;
        background-color: white;
        padding: 0;
        overflow: hidden;
        transition: 0.1s;
        li {
            height: 32px;
            line-height: 32px;
            padding-left: 20px;
            border-top: 1px solid transparent;

            & + li {
                border-top: 1px solid rgba(0, 0, 0, 0.06);
            }
            &.active {
                background-color: #f1f1f1;
                border-top: 1px solid transparent;
            }
        }
    }
}
</style>
