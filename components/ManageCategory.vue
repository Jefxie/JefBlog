<template>
    <div class="mgr-article">
        <div class="article-add">
            <Button size="default" type="primary" @click="modal1 = true">新建分类</Button>
        </div>
        <Modal :transfer="true" v-model="modal1" title="新加分类" @on-ok="onOk" @on-cancel="onCancel">
            名称：
            <Input v-model="categoryModel.name" placeholder="请输入名称" size="default" /> 别名：
            <Input v-model="categoryModel.alias" placeholder="请输入别名" size="default" />
        </Modal>
        <Table size='large' :columns="columns" :data="categoryList"></Table>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import date from '~/uilts/date';
import { Message } from 'iview';

export default {
    name: 'ManageCategory',
    data() {
        return {
            modal1: false,
            categoryModel: {
                name: '',
                alias: '',
            },
            columns: [
                {
                    title: '名称',
                    key: 'name',
                    width: 160,
                },
                {
                    title: '别名',
                    key: 'alias',
                },
                {
                    title: '操作',
                    key: 'operation',
                    width: 160,
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
                                            // this.show(params.index);
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
                                            // this.remove(params.index);
                                        },
                                    },
                                },
                                '删除',
                            ),
                        ]);
                    },
                },
            ],
        };
    },
    computed: {
        ...mapGetters(['categoryList']),
    },
    methods: {
        ...mapActions(['addCategory']),
        onOk() {
            const { name, alias } = this.categoryModel;
            if (!name || !alias) {
                Message.error('未填写完整！');
                return;
            }
            this.addCategory(this.categoryModel)
                .then(() => {
                    Message.success('添加成功！');
                    this.modal1 = false;
                })
                .catch(() => {
                    Message.warning('添加失败！');
                });
        },
        onCancel() {},
    },
};
</script>

<style scoped lang="scss">
.mgr-article {
    width: 100%;
}
.article {
    &-add {
        margin-bottom: 10px;
    }
}
</style>

