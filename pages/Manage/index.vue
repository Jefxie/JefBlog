<template>
    <div class="mgr">
       <Tabs value="name1">
        <TabPane label="文章管理" name="name1">
            <manage-article />
        </TabPane>
        <TabPane label="分类管理" name="name2">
            <manage-category />
        </TabPane>
        <TabPane label="用户管理" name="name3">标签三的内容</TabPane>
    </Tabs>
    </div>
</template>
<script>
import ManageArticle from '~/components/ManageArticle'
import ManageCategory from '~/components/ManageCategory'
export default {
    name:'manage',
    components:{
        ManageArticle,
        ManageCategory
    }
}
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";
.mgr {
    width: $wrap;
    min-height: 600px;
    margin: 20px auto;
}
</style>
