<template>
    <div class="mgr-article">
        <Table size='default' :columns="columns" :data="listData" @on-sort-change="categorySort"></Table>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import date from "~/uilts/date";
export default {
    name: "ManageArticle",
    data() {
        return {
            columns: [
                {
                    title: "分类",
                    key: "category",
                    width: 120,
                    sortable: "custom"
                },
                {
                    title: "标题",
                    key: "title"
                },
                {
                    title: "创建时间",
                    key: "create_at",
                    width: 180,
                    sortable: true
                },
                {
                    title: "操作",
                    key: "operation",
                    width: 130,
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
                                            this.remove(params.index);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            curKey: {
                name: "all",
                i: 0
            }
        };
    },
    computed: {
        ...mapGetters(["articleList", "categoryList"]),
        listData() {
            const _d = this.articleList[this.curKey.name];
            const _a = [];
            if (!_d) return _a;
            _d.forEach(v => {
                _a.push({
                    id: v.id,
                    create_at: date(v.create_at).format("YYYY-MM-DD HH:mm:ss"),
                    category: v.category.name,
                    author: v.author.name,
                    title: v.title
                });
            });
            return _a;
        },
        allKey() {
            const _all = ["all"],
                len = this.categoryList.length;
            for (let i = 0; i < len; i++) {
                _all.push(this.categoryList[i].alias);
            }
            return _all;
        }
    },
    methods: {
        ...mapActions(["getArticleList"]),
        categorySort(data) {
            if (data.order == "asc" && this.curKey.i == 0) return;
            if (data.order == "desc" && this.curKey.i == this.allKey.length - 1)
                return;

            const i = eval(
                `${this.curKey.i}${data.order == "asc" ? "-" : "+"}1`
            );
            console.log('iii',i)
            this.curKey.name = this.allKey[i];
            this.curKey.i = i;
        }
    }
};
</script>

<style scoped lang="scss">
.mgr-article {
    width: 100%;
}
</style>

