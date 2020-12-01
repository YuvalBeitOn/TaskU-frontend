<template>
  <section class="app-login-container">
    <div class="login-header">
      <router-link to="/"
        ><img class="logo2 flex end" src="@/assets/imgs/logo2.png" alt=""
      /></router-link>
    </div>
    <section class="app-login flex column">
      <div class="flex column justify-center">
        <h1 class="login-title">Log <span class="thin-fonted">In</span></h1>
        <form
          class="flex column justify-center align-center"
          @submit.prevent="submitLogin"
        >
          <el-input
            type="text"
            v-model="loginCredentials.email"
            placeholder="Email"
          />

          <el-input
            type="password"
            v-model="loginCredentials.password"
            placeholder="Password"
          />

          <button class="login-btn">Login</button>
        </form>
        <div class="signup-section flex align-center">
          <span class="separator-line"></span>
          <div class="login-subtitle flex align-center justify-center">
            Don't have a user yet?

            <router-link to="/signup">
              <span class="btn-content"> Signup</span>
            </router-link>
          </div>
          <span class="separator-line"></span>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'app-login',
  data() {
    return {
      loginCredentials: {
        email: null,
        password: null,
        isAdmin: false
      }
    }
  },
  created() {},
  methods: {
    async submitLogin() {
      const userCred = JSON.parse(JSON.stringify(this.loginCredentials))
      this.$store.dispatch({
        type: 'login',
        userCred
      })
      this.loginCredentials = {
        email: null,
        password: null,
        isAdmin: false
      }
      this.$router.push('/board')
    }
  }
}
</script>
