<template>
  <div id="app">
    <main class="main-container flex">
      <nav-menu @logout="logout" v-if="isNavShowen" />
      <router-view class="grow" />
    </main>
  </div>
</template>

<script>
import navMenu from '@/cmps/nav-menu'
export default {
  computed: {
    isNavShowen() {
      return this.$route.path === '/login' ||
        this.$route.path === '/signup' ||
        this.$route.path === '/'
        ? false
        : true
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  async created() {
    await this.$store.dispatch({
      type: 'setupSockets'
    })
  },

  components: {
    navMenu
  }
}
</script>
