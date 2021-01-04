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
  data() {
    return {
      isMobile: false
    }
  },
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
  created() {
    if (window.outerWidth < 820) {
      this.isMobile = true
      document.body.classList.add('mobile-screen')
      console.log(document.body)
    }
    console.log('ev:', window.outerWidth)
  },
  destroyed() {
    if (this.isMobile) {
      document.body.classList.remove('mobile-screen')
      this.isMobile = false
    }

    this.$store.dispatch({
      type: 'deletePrivateSocket'
    })
  },

  components: {
    navMenu
  }
}
</script>
