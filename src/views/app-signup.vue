<template>
  <section class="app-signup app-login flex column">
    <div class="login-header flex">TaskU LOGO</div>
    <div class="flex column justify-center">
      <h1 class="login-title">Sign <span class="thin-fonted">up</span></h1>
      <form
        class="flex column justify-center align-center"
        @submit.prevent="submitSignup"
      >
        <el-input
          type="text"
          v-model="signupCredentials.email"
          placeholder="Email"
        />
        <br />
        <el-input
          type="password"
          v-model="signupCredentials.password"
          placeholder="Password"
        />
        <br />
        <button class="login-btn" @click="submitLogin">Login</button>
      </form>
      <div class="signup-section flex align-center">
        <span class="separator-line"></span>
        <div class="login-subtitle flex align-center justify-center">
          Already have a user?
          <router-link to="/login">
            <span class="btn-content"> Login</span>
          </router-link>
        </div>
        <span class="separator-line"></span>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from '@/services/board.service'

export default {
  name: 'app-signup',
  data() {
    return {
      signupCredentials: {
        fullName: null,
        email: null,
        password: null,
        isAdmin: false
      }
    }
  },
  computed: {},
  methods: {
    async submitSignup() {
      const userCred = JSON.parse(JSON.stringify(this.signupCredentials))
      const user = await this.$store.dispatch({
        type: 'signup',
        userCred
      })
      this.signupCredentials = {
        email: null,
        password: null,
        fullName: null,
        isAdmin: false
      }
      console.log(user)
      const board = boardService.getEmptyBoard()
      board.creator = user
      board.members.push(user)
      const boardId = await this.$store.dispatch({
        type: 'saveBoard',
        board
      })
      this.$router.push(`/board/${boardId}`)
    }
  }
}
</script>
