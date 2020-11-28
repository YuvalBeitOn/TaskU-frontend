<template>
    <section class="task-posts">
        <form @submit.prevent="addPost">
            <el-input type="textarea" v-model="newPost" />
            <button>Post</button>
        </form>
        <!-- <el-divider /> -->
        <div class="posts-list flex column align-center">
            <div
                class="task-post-card"
                v-for="post in copiedPosts"
                :key="post.id"
            >
                <div class="user-info-container flex space-between">
                    <avatar
                        class="profile-img"
                        v-if="post.byUser"
                        :username="post.byUser.fullName"
                    ></avatar>
                    <h2 v-if="post.byUser">{{post.byUser.fullName}}</h2>
                </div>
                    <el-divider/>
                <span class="task-post-txt">{{post.txt}}</span>
            </div>
        </div>
    </section>
</template>

<script>
import { boardService } from '../services/board.service'
import Avatar from 'vue-avatar'

export default {
    name: 'task-posts',
    props: {
        posts: {
            type: Array,
        },
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedInUser
        },
    },
    data() {
        return {
            newPost: null,
            copiedPosts: null,
        }
    },
    created() {
        this.copiedPosts = JSON.parse(JSON.stringify(this.posts))
    },
    methods: {
        addPost() {
            if (!this.newPost) {
                return
            }
            const post = boardService.getEmptyPost()
            post.txt = this.newPost
            post.byUser = this.loggedInUser
            this.copiedPosts.unshift(post)
            this.$emit('updatePosts', this.copiedPosts)
            this.newPost = ''
        },
    },
    components: {
        Avatar,
    },
}
</script>

<style>
</style>