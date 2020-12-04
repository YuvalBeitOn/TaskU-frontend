<template>
  <section class="task-posts relative">
    <form @submit.prevent="addPost">
      <textarea
        class="el-input-text-editor"
        @keydown.enter.exact.prevent="addPost"
        rows="3"
        placeholder="Write a massge..."
        v-model="newPost"
      />
      <upload-img @sendImgUrl="imgUrl" />

      <button>Post</button>
    </form>
    <div class="posts-list flex column align-center">
      <div class="task-post-card" v-for="post in copiedPosts" :key="post.id">
        <div class="user-info-container flex space-between">
          <div class="flex align-center">
            <avatar :user="post.byUser" />

            <span class="by-user" v-if="post.byUser">{{
              post.byUser.fullName
            }}</span>
          </div>

          <h5>
            <i class="far fa-clock"></i>
            {{ getTime(post.createdAt) }}
          </h5>
        </div>
        <el-divider />
        <div class="task-post-txt flex column">
          <img v-if="post.imgUrl" :src="post.imgUrl" />
          <span>{{ post.txt }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { boardService } from '../services/board.service'
import Avatar from '@/cmps/user-avatar.vue'
import uploadImg from './upload-img'

import moment from 'moment'

export default {
  name: 'task-posts',
  props: {
    posts: {
      type: Array
    },
    task: Object,
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  data() {
    return {
      newPost: null,
      copiedPosts: null,
      componentKey: 0,
      img: null,
    }
  },
  created() {
    this.copiedPosts = JSON.parse(JSON.stringify(this.posts))
    // console.log(this.logged)
    console.log('type of:',typeof this.task);
    console.log('type of posts:',typeof this.posts);
  },
  methods: {
    imgUrl(url) {
      this.img = url
    },
    getTime(time) {
      return moment(time).fromNow()
    },
    addPost() {
      if (!this.newPost) {
        return
      }

      const post = boardService.getEmptyPost()
      post.txt = this.newPost
      post.byUser = this.user
      post.imgUrl = this.img
      this.copiedPosts.unshift(post)
      const txt = `${this.user.fullName} added new post on task:${this.task.txt} `
      let newActivity = boardService.getEmptyActivity(txt, this.user)
      newActivity.taskId = this.task.id
      this.$emit('updatePosts', this.copiedPosts,newActivity)
      this.newPost = ''
      this.$notify({
        message: 'New post published',
        position: 'bottom-left',
        duration: 2000,
      })
    },
  },
  components: {
    Avatar,
    uploadImg,
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