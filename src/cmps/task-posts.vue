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
                <pre>{{ post }}</pre>
            </div>
        </div>
    </section>
</template>

<script>
import { boardService } from '../services/board.service'
export default {
    name: 'task-posts',
    props: {
        posts: {
            type: Array,
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
            this.copiedPosts.unshift(post)
            this.$emit('updatePosts', this.copiedPosts)
            this.newPost = ''
        },
    },
}
</script>

<style>
</style>