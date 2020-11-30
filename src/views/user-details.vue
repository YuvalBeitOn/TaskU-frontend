<template>
  <section v-if="user && !isLoading" class="user-details flex column">
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
    <el-tabs>
      <el-tab-pane label="User Details">
        <about-user :user="user" />
      </el-tab-pane>
      <el-tab-pane label="Edit Profile">
        <edit-user :user="user" />
      </el-tab-pane>
    </el-tabs>
  </section>
  <div v-else class="flex justify-center align-center">
    <img src="@/assets/imgs/loader.gif" class="loader-app" />
  </div>
</template>

<script>
import aboutUser from '@/cmps/user-details-about-user'
import editUser from '@/cmps/user-details-editor'
import Avatar from 'vue-avatar'

export default {
  name: 'user-details',

  computed: {
    isLoading() {
      return this.$store.getters.isLoading
    },
    user() {
      return this.$store.getters.user
    }
  },
  methods: {},
  created() {
    const { userId } = this.$route.params
    this.$store.dispatch({ type: 'loadUser', userId })
  },
  components: {
    Avatar,
    aboutUser,
    editUser
  }
}
</script>
