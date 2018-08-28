<template>
    <div class="edite">
        <Divider orientation="left">修改头像</Divider>
        <div class="edite-head">
            <img :src="modifyInfo.avatar_url||userInfo.avatar_url" alt="">
            <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                :data="fileData"
                type="drag"
                :action="upAction"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
        </div>
        <Divider orientation="left">修改信息</Divider>
        <div class="user-info">
            <div class="user-info-name">
                <span>名称：</span>
                <Input size="default" v-model="modifyInfo.name" placeholder="请输入昵称！" style="width: 300px" />
                当前昵称：{{userInfo.name||'无'}}
            </div>
            <div class="user-info-name">
                <span>博客：</span>
                <Input size="default" v-model="modifyInfo.blog" placeholder="请输入地址！" style="width: 300px" />
                当前地址：{{userInfo.blog||'无'}}
            </div>
            <div class="user-info-name">
                <span>坐标：</span>
                <Input size="default" v-model="modifyInfo.location" placeholder="请输入坐标！" style="width: 300px" />
                当前坐标：{{userInfo.location||'无'}}
            </div>
        </div>
        <Divider orientation="left">个性简介</Divider>
        <div class="user-bio">
            <p>{{userInfo.bio}}</p>
            <Input type="textarea" size="default" v-model="modifyInfo.bio" placeholder="输入简短的介绍！" />
        </div>
        <div class="user-save">
            <button @click="clickSave">保存</button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ENV from "~/uilts/env.config.js";
import { GetQiniuToken } from "~/api/qiniu";
import { Message } from "iview";

export default {
    name: "edite",
    data() {
        return {
            fileData: {
                token: ""
            },
            modifyInfo: {
                name: "",
                bio: "",
                blog: "",
                avatar_url: "",
                location: ""
            }
        };
    },
    computed: {
        ...mapGetters(["userInfo"]),
        upAction() {
            return ENV.imgAction;
        }
    },
    methods: {
        ...mapActions(["modifyUserInfo"]),
        handleFormatError() {
            Message.error("上传错误");
        },
        handleMaxSize() {
            Message.error("文件不能超出2M");
        },
        async handleBeforeUpload() {
            const res = await GetQiniuToken();
            this.fileData.token = res.token;
            return true;
        },
        handleSuccess(res) {
            this.modifyInfo.avatar_url = res.data;
        },
        clickSave() {
            let flag = false;
            for (const key in this.modifyInfo) {
                if (!!this.modifyInfo[key]) {
                    flag = !!this.modifyInfo[key];
                }
            }
            if (!flag) {
                Message.error("至少修改一项！");
                return;
            }
            this.modifyUserInfo(this.modifyInfo)
                .then(() => {
                    Message.success("保存成功！");
                })
                .catch(() => {
                    Message.error("保存失败");
                });
        }
    }
};
</script>

<style scoped lang="scss">
@import "~/assets/styles/variable.scss";
.edite {
    width: $wrap_s;
    margin: 50px auto;

    &-head {
        display: flex;

        img {
            width: 60px;
            height: 60px;
            margin-right: 20px;
            border-radius: 4px;
        }
    }
}
.user {
    &-info {
        > div {
            margin: 20px 0;
        }
    }
    &-bio {
        p {
            margin-bottom: 10px;
        }
    }
    &-save {
        width: 100%;
        margin-top: 50px;
        text-align: center;
        button {
            width: 65px;
            height: 30px;
            background-color: $jef_red;
            border-radius: 4px;
            color: white;
            cursor: pointer;
        }
    }
}
</style>

