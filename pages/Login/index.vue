<template>
    <div class="login">
        <div class="login-ctx">
            <Icon type="ios-checkmark-circle" />
            <p>登录成功</p>
        </div>
    </div>
</template>
<script>
import Cookies from "js-cookie";
import { mapActions } from "vuex";
export default {
    name: "login",
    watch: {
        $route: {
            handler: function(val, old) {
                Cookies.set("_jefLoginFlag", 1);
                setTimeout(() => {
                    
                    this.getUserInfo();

                    const _url = Cookies.get("_returnUrl") || "/";
                    Cookies.remove("_returnUrl");
                    this.$router.push(_url);
                }, 2000);
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions(["getUserInfo"])
    }
};
</script>

<style scoped lang="scss">
.login {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    &-ctx {
        font-size: 100px;
        color: greenyellow;
        text-align: center;

        p {
            color: #666;
            font-size: 60px;
        }
    }
}
</style>
