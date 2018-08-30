<template>
    <div class="github">
        <a href="https://github.com/Jefxie/JefBlog" target="_blank" class="github-star">
            <Icon type="logo-github" />
            <p>
                &nbsp;GitHub
            </p>
            <span>{{gitHubStar}}</span>
        </a>
    </div>
</template>
<script>
import { GetGitHubStar } from '~/api/user';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'github',
    data() {
        return {
            star: 0,
        };
    },
    computed: {
        ...mapGetters(['gitHubStar']),
    },
    created() {
        this.getGitHubStar();
    },
    methods: {
        ...mapActions(['getGitHubStar']),
    },
};
</script>

<style scoped lang="scss">
.github {
    width: 100%;

    &-star {
        width: 100%;
        height: 50px;
        border: 1px solid #515a6e;
        display: flex;
        align-items: center;
        border-radius: 6px;
        overflow: hidden;
        i {
            font-size: 32px;
            padding-left: 10px;
        }
        p {
            font-size: 30px;
            padding-right: 20px;
        }
        span {
            position: relative;
            height: 100%;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 26px;
            background-color: #515a6e;
            color: #fff;

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: -20px;
                width: 0;
                height: 0;
                border: 10px solid #515a6e;
                border-top-color: transparent;
                border-left-color: transparent;
                border-bottom-color: transparent;
            }
        }
    }
}
</style>

