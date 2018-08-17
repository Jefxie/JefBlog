new Vue({
    el: '#app',
    data: {
        content: '',
        config:{

        }
    },
    watch:{
        content:function(v,o){
            console.log('v',v)
        }
    },
    methods:{
        beforeUpload(){
            
        }
    }
})