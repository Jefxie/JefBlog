<template>
    <div class="editor">
        <h1>sss</h1>
        <i-editor v-model="content"></i-editor>
    </div>
</template>
<script>
import IEditor from "iview-editor";
export default {
    name:'xeditor',
    data(){
        return {
            content:''
        }
    },
    components:{
        IEditor
    },
    created() {
        window.localStorage.setItem('sss','sss')
    },
}
</script>
