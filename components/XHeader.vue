<template>
    <div class="xheader" :class="clarity?'clarity':''">
        <div class="xheader-wrap">
            <div class="xheader-wrap-l">
                <h1 class="xheader-logo">
                    <img v-if="clarity" src="../assets/images/logo.w.png" alt="jef.site">
                    <img v-else src="../assets/images/logo.r.png" alt="jef.site">
                </h1>
                <ul class="xheader-wrap-tab" :class="clarity?'f':''">
                    <template v-for="(item,i) in headers">
                        <li :class="isActive(item.path)?'active':''" :key="i" @click="jumpTo(item.path)">
                            {{item.name}}
                        </li>
                    </template>
                </ul>
            </div>
            <div class="xheader-wrap-r">
                <button @click="toLogin" class="xheader-wrap-login">登录</button>
                <button class="xheader-wrap-register">注册</button>
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from "js-cookie";
import { userLogin } from "~/api/user";
export default {
    name: "xheader",
    props: {
        clarity: {
            type: Boolean,
            default: true
        },
        headers: {
            type: Array,
            default: () => []
        },
        active: {
            type: String,
            default: "/"
        }
    },
    methods: {
        isActive(p) {
            if (this.active === "/" && p === "/") return true;
            if (p === "/") return false;
            return this.active.includes(p);
        },
        jumpTo(to) {
            this.$router.push(to);
        },
        async toLogin() {
            const _url = window.location.href;
            Cookies.set(
                "_returnUrl",
                _url.replace("http://127.0.0.1:3000", "")
            );
            const _target = "http://127.0.0.1:7001/passport/github";
            window.location.href = _target;
        }
    }
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";
.xheader {
    width: 100%;
    height: 59px;
    background-color: $bg;
    border-bottom: 1px solid rgba($color: $font_3, $alpha: 0.2);
    transition: 0.3s;
    &.clarity {
        background-color: transparent;
        border-bottom: 0;
    }
    &-logo {
        height: 36px;
        margin: 0;
        line-height: 0;
        img {
            height: 100%;
        }
    }
    &-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: $wrap;
        height: 100%;
        margin: 0 auto;

        &-l {
            display: flex;
        }
        &-tab {
            display: flex;
            align-items: center;
            margin-left: 80px;
            font-size: 18px;
            &.f {
                color: #fff;

                .active {
                    color: #fff;
                    border-bottom: 1px solid #fff;
                }
                li {
                    &:hover {
                        border-bottom: 1px solid #fff;
                    }
                }
            }
            li {
                margin-right: 20px;
                cursor: pointer;
                border-bottom: 1px solid transparent;
                &:hover {
                    border-bottom: 1px solid $jef_red;
                }
                &.active {
                    color: $jef_red;
                }
            }
        }
        &-login,
        &-register {
            width: 60px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            background-color: transparent;
            border-radius: 4px;
            border: 1px solid #000;
        }
        &-login {
            margin-right: 10px;
        }
        &-register {
        }
    }
}
</style>
