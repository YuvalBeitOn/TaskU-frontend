<template>
  <div id="app">
    <main :class="['main-container flex', darkMode]">
      <nav-menu @logout="logout" v-if="isNavShowen" />
      <router-view :class="['grow', darkMode]" />
    </main>
  </div>
</template>

<script>
import navMenu from '@/cmps/nav-menu'
export default {
  computed: {
    darkMode() {
      return this.$store.getters.getDarkModeToggle
    },
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
  destroyed() {
       this.$store.dispatch({
      type: 'deletePrivateSocket'
    })
  },
  // async created() {
  //   await this.$store.dispatch({
  //     type: 'setupSockets'
  //   })
  // },

  components: {
    navMenu
  }
}
</script>
