<template>
  <section class="nav-menu flex column align-center space-between">
    <div class="top-nav flex column space-between align-center">
      <div class="nav-logo">
        <router-link to="/board/">
          <img src="img/icons/logo_icon.png" alt="TaskU" />
        </router-link>
      </div>
      <i v-tooltip.right="'Notfications'" class="nav-icon far fa-bell"></i>
      <i v-tooltip.right="'Inbox'" class="nav-icon far fa-inbox-in"></i>
    </div>

    <div class="middle-nav">
      <div class="user-greeting">Hello Guest</div>
    </div>
    <div class="bottom-nav flex column align-center">
      <i v-tooltip.right="'Calender'" class="nav-icon fal fa-calendar-check"></i>
      <router-link to="/user/301">
        <i v-tooltip.right="'User Profile'" class="nav-icon profile fas fa-user-circle"></i>
      </router-link>
      <router-link to="/">
        <i v-tooltip.right="'Logout'" class="nav-icon logout fad fa-sign-out"></i>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'nav-menu',
  computed: {
  },
}
</script>
