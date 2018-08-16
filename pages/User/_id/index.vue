<template>
    <div class="user">
        <div class="user-top">
            <img class="user-top-avatar" :src="userData.avatar_url" alt="">
            <div class="user-top-info">
                <h3>{{userData.name}}</h3>
                <span>{{userData.login}}</span>
            </div>
        </div>
            <Divider orientation="left">邮箱</Divider>
        <div class="user-blog">
            <Icon type="ios-at" />
            <p>{{userData.email}}</p>
        </div>
            <Divider orientation="left">坐标</Divider>
        <div class="user-blog">
            <Icon type="md-compass" />
            <p>{{userData.location}}</p>
        </div>
            <Divider orientation="left">主页</Divider>
        <div class="user-blog">
            <Icon type="md-aperture" />
            <p>{{userData.blog}}</p>
        </div>
        <div class="user-bio">
            <Divider orientation="left">BIO</Divider>
            <p>{{userData.bio}}</p>
        </div>

    </div>
</template>
<script>
import { GetUserInfo } from "~/api/user";
import { mapGetters } from "vuex";

export default {
    name: "user",
    data() {
        return {
            userData: {
                avatar_url: "",
                name: "",
                login: "",
                email: "",
                location: "",
                blog: "",
                bio: ""
            }
        };
    },
    computed: {
        ...mapGetters(["userInfo"])
    },
    head() {
        return {
            title: `${this.userData.name||''}(${this.userData.login||''})的个人主页`,
            meta: [
                {
                    hid: "user",
                    name: "user",
                    content: "Jef.site 雨夜客栈(博客)"
                }
            ]
        };
    },
    watch: {
        $route: {
            handler: async function(val, old) {
                if (
                    this.userInfo.login &&
                    val.params.id == this.userInfo.login
                ) {
                    Object.assign(this.userData, this.userInfo);
                } else {
                    if (!val.params.id) return;
                    const res = await GetUserInfo(val.params.id);
                    this.userData = res.data;
                }
            },
            immediate: true
        }
    }
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";

.user {
    width: $wrap_s;
    min-height: 580px;
    margin: 30px auto;

    &-top {
        display: flex;

        &-avatar {
            width: 52px;
            height: 52px;
            border-radius: 10px;
        }
        &-info {
            margin-left: 15px;
            h3 {
                font-size: 20px;
            }
            span {
                font-size: 14px;
            }
        }
    }
    &-blog {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-bottom: 10px;
        p {
            margin-left: 10px;
            font-size: 14px;
        }
    }
}
</style>
