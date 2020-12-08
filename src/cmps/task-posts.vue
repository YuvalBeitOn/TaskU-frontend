<template>
  <section class="task-posts relative">
    <form class="task-post-form relative" @submit.prevent="addPost">
      <textarea
        class="el-input-text-editor"
        @keydown.enter.exact.prevent="addPost"
        rows="3"
        placeholder="Write a massge..."
        v-model="newPost"
      />
      <upload-img @sendImgUrl="imgUrl" />
      <button class="post-btn">Post</button>
    </form>
    <ul class="posts-list clean-list flex column align-center">
      <li
        class="task-post-card relative"
        v-for="post in copiedPosts"
        :key="post.id"
        @mouseover="setHoveredPost(post.id)"
        @mouseleave="isHovering = false"
      >
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
        <div class="task-post-container flex space-between">
          <span>{{ post.txt }}</span>
          <!-- <div class="ratio-square"> -->
          <img class="uploaded-img" v-if="post.imgUrl" :src="post.imgUrl" />
          <!-- </div> -->
        </div>
        <button
          class="delete-post-btn"
          @click="deletePost(post.id)"
          v-if="isHovering && hoveredPostId === post.id"
        >
          <i class="fal fa-trash"></i>
        </button>
      </li>
    </ul>
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
    task: Object
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    miniUser() {
      return this.$store.getters.miniUser
    }
  },
  data() {
    return {
      newPost: null,
      copiedPosts: null,
      componentKey: 0,
      img: null,
      hoveredPostId: null,
      isHovering: false
    }
  },
  created() {
    this.copiedPosts = JSON.parse(JSON.stringify(this.posts))
  },
  methods: {
    setHoveredPost(postId) {
      this.isHovering = true
      this.hoveredPostId = postId
    },
    imgUrl(url) {
      this.img = url
    },
    getTime(time) {
      return moment(time).fromNow()
    },
    deletePost(postId) {
      this.$emit('deletePost', postId)
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
      const txt = `${this.user.fullName} added new post on task: ${this.task.txt} `
      let newActivity = boardService.getEmptyActivity(txt, this.miniUser)
      newActivity.taskId = this.task.id
      this.$emit('updatePosts', this.copiedPosts, newActivity)
      this.newPost = ''
      this.$notify({
        message: 'New post published',
        position: 'bottom-left',
        duration: 2000
      })
    }
  },
  components: {
    Avatar,
    uploadImg
  },
  watch: {
    '$route.params.taskId'() {
      this.copiedPosts = this.posts
    }
  }
}
</script>

<style></style>
