<template>
  <section class="app-login-container">
    <div class="login-header">
      <router-link to="/"
        ><img class="logo2 flex end" src="@/assets/imgs/logo2.png" alt=""
      /></router-link>
    </div>
    <section class="app-login flex column">
      <div class="flex column justify-center">
        <h2 class="login-title">Log <span class="thin-fonted">In</span></h2>
        <form
          class="flex column justify-center align-center"
          @submit.prevent="submitLogin"
        >
          <el-input
            type="text"
            v-model="loginCredentials.email"
            placeholder="Email"
            :disabled="isElementDisabled"
          />

          <el-input
            type="password"
            v-model="loginCredentials.password"
            placeholder="Password"
            :disabled="isElementDisabled"
          />

          <button class="login-btn" :disabled="isElementDisabled">Login</button>
        </form>
        <div class="social-login flex align-center">
          <span class="separator-line"></span>
          <div class="login-subtitle flex align-center justify-center">
            Or Sign-in with
          </div>
          <span class="separator-line"></span>
        </div>
        <div class="social-logos flex space-between">
          <div class="social-option">
            <img src="@/assets/imgs/logo_google.png" />
            Google
          </div>
          <div class="social-option">
            <img src="@/assets/imgs/facebook_logo.png" />
            Facebook
          </div>
        </div>
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
        <!-- <googleLogin
                    :params="googleSignInParams"
                    :onSuccess="onGoogleSuccess"
                    :onFailure="onGoogleFailure"
                    >Login</googleLogin
                > -->
      </div>
    </section>
  </section>
</template>

<script>
// import googleLogin from 'vue-google-login'

export default {
  name: 'app-login',
  data() {
    return {
      loginCredentials: {
        email: null,
        password: null,
        isAdmin: false,
      },
      isElementDisabled: false,
      googleSignInParams: {
        clientId:
          '362174628097-alt6tonjakiq40pcm6i9rno28997rgfh.apps.googleusercontent.com',
      },
    }
  },
  computed: {
    defaultBoardId() {
      return this.$store.getters.defaultBoardId
    },
  },
  created() {},
  methods: {
    async submitLogin() {
      const userCred = JSON.parse(JSON.stringify(this.loginCredentials))
      try {
        let user = await this.$store.dispatch({
          type: 'login',
          userCred,
        })
        if (user) {
          this.isElementDisabled = true
          await this.$store.dispatch({ type: 'loadBoards' })
          console.log('user after login:', user)
          this.$message({
            duration: 2000,
            showClose: true,
            type: 'success',
            offset: 335,
            message: "You've sucessfully logged in!",
          })
          setTimeout(() => {
            this.$router.push(`/board/${this.defaultBoardId}`)
          }, 2000)
        }
      } catch (err) {
        if (err.response.status === 401) {
          this.$message({
            durtion: 2000,
            showClose: true,
            type: 'error',
            offset: 335,
            message: 'Incorrect email or password.',
          })
        }
      }
      this.loginCredentials = {
        email: null,
        password: null,
        isAdmin: false,
      }
    },
    // onGoogleSuccess(obj) {
    //     console.log(obj)
    // },
    // onGoogleFailure(googleUser) {
    //     googleUser.getBasicProfile()
    // },
  },
  // components: {
  //     googleLogin,
  // },
}
</script>
