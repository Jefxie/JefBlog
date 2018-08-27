<template>
    <ul class="notice">
        <li class="notice-li" v-for="item in list" :key="item._id">
                <i>@{{item.from.name}}</i>
                在&nbsp;
                <p @click="goToTarget(item.target.id,item._id,item.state)">{{item.target.title}}</p>&nbsp;
                中回复了你！
                <button @click="goToTarget(item.target.id,item._id,item.state)">点击查看</button>
        </li>
    </ul>
</template>
<script>
import { ModifyNotice } from "~/api/blog";
export default {
    name: "xnoticelist",
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        goToTarget(target, id, state) {
            if (state === 1) {
                ModifyNotice(id);
            }
            this.$router.push("/blog/detail/" + target + ".html");
        }
    }
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";

.notice {
    width: 100%;
    &-li {
        width: 100%;
        padding: 16px 0;
        display: flex;
        align-items: center;
        font-size: 14px;
        border-bottom: 1px solid rgba($color: #333, $alpha: 0.2);

        i {
            color: $jef_red;
            margin-right: 10px;
        }
        p {
            text-decoration: underline;
        }

        button:hover,
        p:hover {
            color: $jef_red;
            cursor: pointer;
        }
    }
}
</style>
