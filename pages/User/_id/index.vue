<template>
    <div class="user">
        <span @click="$router.push('/user/edite')" class="user-edit">
            <Icon type="ios-create-outline" />
            编辑名片
        </span>
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

       <div v-if="showNoticeList" class="user-notic">
           <!-- <h3>消息列表</h3> -->
            <Divider orientation="center">消息列表</Divider>
            <Tabs value="readNotice" @on-click="changeTabs">
                <TabPane label="未读" name="readNotice">
                    <x-notice-list 
                    :list="readNotice" />
                </TabPane>
                <TabPane label="已读" name="unReadNotice">
                    <x-notice-list 
                    :list="unReadNotice" />
                </TabPane>
            </Tabs>
       </div>
    </div>
</template>
<script>
import { GetUserInfo } from "~/api/user";
import { GetNoticeList } from "~/api/blog";
import { mapGetters } from "vuex";
import XNoticeList from "~/components/XNoticeList";
export default {
    name: "user",
    data() {
        return {
            userData: {},
            noticeShow: false,
            readNotice: [],
            unReadNotice: []
        };
    },
    components: {
        XNoticeList
    },
    computed: {
        ...mapGetters(["userInfo"]),
        showNoticeList() {
            const _login = this.$route.params.id;
            if (this.userInfo && this.userInfo.login === _login) {
                return true;
            }
            return false;
        }
    },
    head() {
        return {
            title: `${this.userData ? this.userData.name : ""}(${
                this.userData ? this.userData.login : ""
            })的个人主页`,
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
                    this.noticeShow = true;
                    Object.assign(this.userData, this.userInfo);
                    this.getNoticeList(this.userInfo.id, 1);
                } else {
                    if (!val.params.id) return;
                    const res = await GetUserInfo(val.params.id);
                    this.userData = res.data;
                }
            },
            immediate: true
        }
    },
    methods: {
        async getNoticeList(id, state = 1) {
            const name = state == 1 ? "readNotice" : "unReadNotice";
            if (this[name].length > 0) {
                return;
            }
            const res = await GetNoticeList(id, state);
            this.$set(this, name, res.data);
        },
        changeTabs(name) {
            const state = name == "readNotice" ? 1 : 0;
            this.getNoticeList(this.userInfo.id, state);
        }
    }
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";

.user {
    position: relative;
    width: $wrap_s;
    min-height: 580px;
    margin: 30px auto;
    &-edit {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 14px;
        cursor: pointer;
        color: $font_2;
        &:hover {
            color: $jef_red;
        }
    }
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
