<template>
  <section class="home-page flex column">
      <!-- nav menu -->
    <div  :class="['nav-container',scrollNav]">
      <div class="container-nav hm-container  flex  align-center space-between">
        <div class="app-logo">
          <img class="logo1" src="@/assets/imgs/logo3.png" alt="" />
        </div>
        
        <i @click="toggleNav" class="fas fa-bars hmburger"></i>
        <nav @click.stop="isNavShown = false" :class="['nav-home-page flex space-between align-center',navMobile]">
          <router-link to="/">home</router-link>
          <router-link v-if="!loggedInUser" to="/login">login</router-link>
          <router-link v-if="!loggedInUser" to="/signup">sign up</router-link>
          <span v-if="loggedInUser" @click="onLogout">logout</span>
          <button @click="onGetStarted" :style="showBtnStarted" class="btn-app btn-nav">
            Get Started
          </button>
        </nav>
      </div>
    </div>
    <!-- hero-section -->
    <section class="hero-homepage hero-container">
      <div class="main-hero hm-container flex space-between">
        <div class="content-container flex column wrap tracking-in-expand">
          <h1 class="title-hero">Work the way that works for you</h1>
          <p class="hero-txt">
            Highly effective teams choose TaskU - Work OS for better
            collaboration, organization, and efficiency in all their work.
          </p>
          <button @click="onGetStarted" class="btn-app main-btn">
            {{ enteryButton }}
          </button>
        </div>
        <div class="img-hero">
          <img
            src="@/assets/imgs/svg/hero-img.svg"
            class="img-home-page"
            alt=""
            srcset=""
          />
      
          
        </div>
      </div>
      <img class="svg-border" src="@/assets/imgs/svg/bottom-svg.svg" alt="" srcset="">
    </section>
    <!-- features -->
    <section class="main-features relative">
      <div class="features-cotainer hm-container flex wrap">
        <div class="feature-box   flex column align-center">
          <div class="icon-box-container flex align-center justify-center">
            <i class="fas fa-tasks"></i>
          </div>
          <div class="content-container flex column align-center">
            <h3 class="title-box">Project management</h3>
            <p class="txt-box">
              Plan, track, and manage any project from start to finish
            </p>
          </div>
        </div>
        <div class="feature-box flex column align-center">
          <div class="icon-box-container flex align-center justify-center">
            <i class="fas fa-code"></i>
          </div>
          <div class="content-container flex column align-center">
            <h3 class="title-box">Software development</h3>
            <p class="txt-box">
              Sprint through every development process, your way
            </p>
          </div>
        </div>
        <div class="feature-box flex column align-center">
          <div class="icon-box-container flex align-center justify-center">
            <i class="fas fa-building"></i>
          </div>

          <div class="content-container flex column align-center">
            <h3 class="title-box">Construction</h3>
            <p class="txt-box">
              Organize any construction project from the ground up
            </p>
          </div>
        </div>
      </div>
    
     <svg class="svg-border" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="#f2f6fc" ><path  d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path></svg>

  
    </section>
    <!-- benefits -->
    <section class="main-benefits ">
        <div class="hm-container benefits-content flex column wrap">
      <div class="benefit-card flex wrap">
        <img class="benefit-img" src="@/assets/imgs/home-page/lalala.png" />
        <div class="benefit-content  flex column align-center justify-center">
          <h2 class="benefit-title">Manage everything in one workspace</h2>
          <p class="benefit">
            Planning, tracking and delivering your team’s best work has never
            been easier
          </p>
        </div>
      </div>
      <div class="benefit-card flex  wrap">
        <div class="benefit-content flex column align-center justify-center">
          <h2 class="benefit-title">Set up in minutes</h2>
          <p class="benefit">
            Get started fast with hundreds of visual and customizable templates
            - or create your own
          </p>
        </div>
                <img class="benefit-img" src="@/assets/imgs/home-page/lalala.png" />

      </div>
      </div>
    </section>
    </section>
</template>

<script>
export default {
  name: 'home-page',
  data(){
      return{
          scrollPosition:null,
          isNavShown:false
      }
  },
  computed: {
navMobile(){
  return this.isNavShown ? 'open-nav' : ''
},
      scrollNav(){
          return this.scrollPosition > 50 ? 'change-color-nav' : ''
      },
    firstBoardId() {
      return this.$store.getters.defaultBoardId
    },
    loggedInUser() {
      return this.$store.getters.user
    },
    enteryButton() {
      return this.loggedInUser ? 'Enter Workspace' : 'Try as a guest'
    },
    showBtnStarted(){
      return this.isNavShown && 'display:none;'
    }
  },
  methods: {
        toggleNav(){
      this.isNavShown = !this.isNavShown
    },
      hendaleScroll(){
          console.log('scroll me');
    this.scrollPosition = window.scrollY
      console.log('this.scrollPosition:', this.scrollPosition)
      },
    async onGetStarted() {
      if (this.loggedInUser) {
        this.$router.push('/board/' + this.firstBoardId)
      } else {
        await this.$store.dispatch({
          type: 'login',
          userCred: 'guest',
        })
        await this.$store.dispatch({ type: 'loadBoards' })
        this.$router.push(`board/${this.firstBoardId}`)
      }
    },
    onLogout() {
      console.log('Logging out')
      this.$store.dispatch({
        type: 'logout',
      })
    },
  },
  mounted() {
    window.addEventListener('scroll', this.hendaleScroll);
},
  created() {
    if (this.loggedInUser) {
      this.$store.dispatch({ type: 'loadBoards' })
    }
  },
}
</script>
