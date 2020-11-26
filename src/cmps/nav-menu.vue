<template>
  <section class="nav-menu flex column align-center space-between">
    <div class="top-nav flex column space-between align-center">
      <div class="nav-logo">
         <router-link to="/">
        <img src="img/icons/logo_icon.png"  alt="TaskU" />
         </router-link>
      </div>
      <i class="nav-icon fas fa-bell"></i>
      <i class="nav-icon fas fa-inbox-in"></i>
    </div>

    <div class="middle-nav">
      <div class="user-greeting">Hello-Guest!</div>
    </div>
    <div class="bottom-nav flex column align-center">
      <i class="nav-icon fal fa-calendar-check"></i>
         <router-link to="/user/301">

      <i class="nav-icon profile fas fa-user-circle"></i>
         </router-link >
      
      <i class="nav-icon logout fad fa-sign-out"></i>

    </div>
  </section>
</template>

<script>
export default {
  name: 'nav-menu',
}
</script>
