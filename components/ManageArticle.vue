<template>
    <div class="mgr-article">
        <Table size='default' :columns="columns" :data="listData" @on-sort-change="categorySort"></Table>

        <Modal v-model="delModal" width="360" :transfer="true">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>确认删除这个文章？</p>
                <p>Will you delete it?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="del_loading" @click="deleteCol">删除</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import date from '~/uilts/date';
export default {
    name: 'ManageArticle',
    data() {
        return {
            delModal: false,
            del_loading: false,
            curId: '',
            columns: [
                {
                    title: '分类',
                    key: 'category',
                    width: 120,
                    sortable: 'custom',
                },
                {
                    title: '标题',
                    key: 'title',
                },
                {
                    title: '创建时间',
                    key: 'create_at',
                    width: 180,
                    sortable: true,
                },
                {
                    title: '操作',
                    key: 'operation',
                    width: 130,
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params);
                                        },
                                    },
                                },
                                '编辑',
                            ),
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                    },
                                    on: {
                                        click: () => {
                                            this.delModal = true;
                                            this.curId = params.row.id;
                                        },
                                    },
                                },
                                '删除',
                            ),
                        ]);
                    },
                },
            ],
            curKey: {
                name: 'all',
                i: 0,
            },
        };
    },
    computed: {
        ...mapGetters(['articleList', 'categoryList']),
        listData() {
            const _d = this.articleList[this.curKey.name];
            const _a = [];
            if (!_d) return _a;
            _d.forEach(v => {
                _a.push({
                    id: v.id,
                    create_at: date(v.create_at).format('YYYY-MM-DD HH:mm:ss'),
                    category: v.category.name,
                    author: v.author.name,
                    title: v.title,
                });
            });
            return _a;
        },
        allKey() {
            const _all = ['all'],
                len = this.categoryList.length;
            for (let i = 0; i < len; i++) {
                _all.push(this.categoryList[i].alias);
            }
            return _all;
        },
    },
    methods: {
        ...mapActions(['removeArticle']),
        categorySort(data) {
            if (data.order == 'asc' && this.curKey.i == 0) return;
            if (data.order == 'desc' && this.curKey.i == this.allKey.length - 1)
                return;

            const i = eval(
                `${this.curKey.i}${data.order == 'asc' ? '-' : '+'}1`,
            );
            this.curKey.name = this.allKey[i];
            this.curKey.i = i;
        },
        deleteCol() {
            this.del_loading = true;
            this.removeArticle({
                id: this.curId,
                key: this.curKey.name,
            })
                .then(r => {
                    this.del_loading = false;
                    this.delModal = false;
                })
                .catch(e => {
                    this.del_loading = false;
                    this.delModal = false;
                });
        },
    },
};
</script>

<style scoped lang="scss">
.mgr-article {
    width: 100%;
}
</style>

