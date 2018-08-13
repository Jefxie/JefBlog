new Vue({
    el: '#app',
    data: {
        content: '',
    },
    watch:{
        content:function(v,o){
            console.log('v',v)
        }
    }
})