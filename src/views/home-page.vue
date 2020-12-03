<template>
  <section class="home-page">
    <div class="nav-container flex wrap align-center space-between">
      <div class="app-logo">
        <img class="logo1 flex end" src="@/assets/imgs/logo1.png" alt="" />
      </div>
      <nav class="nav-home-page flex space-between align-center">
        <router-link to="/">home</router-link>
        <router-link v-if="!loggedInUser" to="/login">login</router-link>
        <router-link v-if="!loggedInUser" to="/signup">sign up</router-link>
        <span v-if="loggedInUser" @click="onLogout">logout</span>
        <button @click="onGetStarted" class="btn-app btn-nav">
         Get Started
        </button>
      </nav>
    </div>

    <main class="main-content top-hero">
      <section class="hero-homepage hero-container">
        <div class="main-hero-contant flex space-between">
          <div class="content-container flex column  wrap">
            <h1>Team-work in modern days is EASY</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
              dolore modi numquam nostrum voluptatem deleniti harum dicta odio.
            </p>
            <button @click="onGetStarted" class="btn-app">
              {{ enteryButton }}
            </button>
          </div>
          <div class="img-hero">
            <img
              src="@/assets/imgs/img-hero1.svg"
              class="img-home-page"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
export default {
  name: 'home-page',
  computed: {
    firstBoardId() {
      const boards = this.$store.getters.boards
      return boards[0]._id
    },
    loggedInUser() {
      return this.$store.getters.user
    },
    enteryButton() {
      return this.loggedInUser ? 'Enter Workspace' : 'Try as a guest'
    }
  },
  methods: {
    async onGetStarted() {
      if (this.loggedInUser) {
        this.$router.push('/board/' + this.firstBoardId)
      } else {
        await this.$store.dispatch({
          type: 'login',
          userCred: 'guest'
        })
        await this.$store.dispatch({ type: 'loadBoards' })
        console.log(this.firstBoardId)
        this.$router.push('/board/' + this.firstBoardId)
      }
    },
    onLogout() {
      console.log('Logging out')
      this.$store.dispatch({
        type: 'logout'
      })
    }
  },
  created() {
    if (this.loggedInUser) {
      this.$store.dispatch({ type: 'loadBoards' })
    }
  }
}
</script>
