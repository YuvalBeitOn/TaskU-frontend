<template>
  <section class="home-page ">
    <div class="nav-container   flex wrap align-center space-between">  
    <div class="app-logo">
       TaskU
    </div>
    <nav class="nav-home-page flex space-between">
    <router-link to="/">home</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/signup">sign up</router-link>
    <router-link to="/board">Get Started!</router-link>
    </nav>
     </div>

    <main class="main-content top-hero">
    <section class="hero-homepage hero-container "> 
      <div class="main-hero-contant flex space-between ">
      <div class="content-container flex column  align-center wrap">
<h1>Work its easy with us</h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt dolore modi numquam nostrum voluptatem deleniti harum dicta odio eveniet adipisci magni cupiditate doloribus quae mollitia soluta itaque nemo, deserunt quia!</p>
    <button @click="$router.push('/board/u102')" class="btn-app">Get Started</button>
      </div>
      <div class="img-hero">
        <img src="@/assets/imgs/img-hero1.svg" class="img-home-page" alt="" srcset="">
      </div>
      </div>
    </section>
    </main>

  </section>
</template>

<script>
export default {
  name: "home-page",
  components: {}
};
</script>
