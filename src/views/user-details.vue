<template>
  <section v-if="user" class="user-details flex column">
    <section
      class="header-user-profile flex column justify-center align-center"
    >
      <div class="img-profile">
        <avatar
          class="profile-img"
          v-if="user"
          :username="user.fullName"
        ></avatar>
      </div>

      <h3 class="mail">{{ user.email }}</h3>
    </section>
    <div class="msg-user flex justify-center align-center">
    <h2>Hello,{{ user.fullName }}</h2>

    </div>
    <section class="user-content flex space-around align-center">
      <div class="user-details-info flex column wrap align-center">
        <h2>Details</h2>
        <h2><strong class="title-details">Full name:</strong>{{ user.fullName }}</h2>
        <h2><strong class="title-details">Email:</strong>{{ user.email }}</h2>
      </div>
      <ul class="list-board flex column wrap clean-list align-center">
        <li><h2>Your board list</h2></li>
        <li>board</li>
        <li>board</li>
        <li>board</li>
        <li>board</li>
      </ul>
      <div class="left-task">
        <p>You have  left 4 tasks to compolete</p>
      </div>
    </section>
  </section>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  name: 'user-details',

  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  created() {
    const { userId } = this.$route.params
    this.$store.dispatch({ type: 'loadUser', userId })
  },
  components: {
    Avatar,
  },
}
</script>
