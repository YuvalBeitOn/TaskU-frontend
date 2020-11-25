<template>
  <section class="nav-menu flex column align-center space-between">
    <div class="top-bar flex column space-between align-center">
      <div class="nav-logo">
        <img src="img/icons/logo_icon.png" alt="TaskU" />
      </div>
      <i class="nav-icon fas fa-bell"></i>
      <i class="nav-icon fas fa-inbox-in"></i>
    </div>

    <div class="middle-bar">
      <div class="user-greeting">Hello-Guest!</div>
    </div>
    <div class="bottom-bar flex column align-center">
      <i class="nav-icon fal fa-calendar-check"></i>
      <i class="nav-icon fas fa-user-circle"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "nav-menu",
};
</script>

