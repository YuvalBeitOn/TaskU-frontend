<template>
    <section class="task-posts relative">
        <form @submit.prevent="addPost">
            <textarea class="el-input-text-editor" @keydown.enter.exact.prevent="addPost" rows="3" placeholder="Write a massge..."  v-model="newPost" />
            <button>Post</button>
        </form>
        <div class="posts-list flex column align-center">
            <div
                class="task-post-card"
                v-for="post in copiedPosts"
                :key="post.id"
            >
                <div class="user-info-container flex space-between">
                    <div class="flex align-center">
                           <avatar
                           size="30"
                           color="white"
                        class="profile-img"
                        v-if="post.byUser"
                        :username="post.byUser.fullName"
                    ></avatar>
 <span class="by-user" v-if="post.byUser">{{ post.byUser.fullName }}</span>
                    </div>
                 
                   
                    <h5><i class="far fa-clock"></i> {{getTime(post.createdAt)}}</h5>
                </div>
                <el-divider />
                <span class="task-post-txt">{{ post.txt }}</span>
                
            </div>
        </div>
    </section>
</template>
<script>
import { boardService } from '../services/board.service'
import Avatar from 'vue-avatar'
import moment from 'moment'

export default {
    name: 'task-posts',
    props: {
        posts: {
            type: Array,
        },
    },
    computed: {
        loggedInUser() {
            return this.$store.getters.user
        },
    },
    data() {
        return {
            newPost: null,
            copiedPosts: null,
            componentKey: 0,
        }
    },
    created() {
        this.copiedPosts = JSON.parse(JSON.stringify(this.posts))
    },
    methods: {
        getTime(time){
            return moment(time).calendar()
        },
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
    watch: {
        '$route.params.taskId'() {
            this.copiedPosts = this.posts
        },
    },
}
</script>

<style>
</style>