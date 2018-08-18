.<template>
    <div class="slidebar">
        <XRadioGrop
        :alias="active"
        :list="gropList"
        @aliaser="jumpTo"
        styles="margin-right: 6px;margin-bottom: 6px;"
         />
        <!-- <ul>
            <li class="slidebar-item" :class="active=='all'?'active':''" @click="jumpTo('all')">
                <div>&nbsp;全部</div>
                <Icon type="ios-arrow-forward" />
            </li>
            <template v-for="(item,i) in list">
                <li class="slidebar-item" :class="active==item.alias?'active':''" :key="i" @click="jumpTo(item.alias)">
                    <div>&nbsp;{{item.name}}</div>
                    <Icon type="ios-arrow-forward" />
                </li>
            </template>
        </ul> -->
    </div>
</template>
<script>
import XRadioGrop from "~/components/XRadioGrop";

export default {
    name: "xsidebar",
    props: {
        list: {
            type: Array,
            default: () => []
        },
        active: {
            type: String,
            default: "all"
        }
    },
    computed: {
        gropList() {
            const _a = {
                name: "全部",
                alias: "all",
                id: "123"
            };
            return [_a, ...this.list];
        }
    },
    components: {
        XRadioGrop
    },
    methods: {
        jumpTo(target) {
            this.$router.push("/blog/" + target);
        }
    }
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";

.slidebar {
    width: 100%;
    padding: 20px;
    padding-left: 0;
    ul {
        width: 100%;
    }
    &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 20px;
        margin: 14px 0;
        font-size: 18px;
        cursor: pointer;
        border-left: 2px solid transparent;
        &:hover {
            background-color: $jef_red;
            color: #fff;
        }
        &.active {
            border-left-color: $jef_red;
        }
    }
}
</style>
