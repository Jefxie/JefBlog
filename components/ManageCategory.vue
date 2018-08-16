<template>
    <div class="mgr-article">
        <Table size='large' :columns="columns" :data="categoryList"></Table>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import date from "~/uilts/date";
export default {
    name: "ManageCategory",
    data() {
        return {
            columns: [
                {
                    title: "名称",
                    key: "name",
                    width: 160
                },
                {
                    title: "别名",
                    key: "alias"
                },
                {
                    title: "操作",
                    key: "operation",
                    width: 160,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            // this.show(params.index);
                                            console.log(params);
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            // this.remove(params.index);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
        };
    },
    computed: {
        ...mapGetters(["categoryList"]),
       
    },
    methods: {
        ...mapActions(["getArticleList"])
    }
};
</script>

<style scoped lang="scss">
.mgr-article {
    width: 100%;
}
</style>

