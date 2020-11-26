<template>
  <section v-if="user" class="user-details">
    <section class="header-user-profile flex colum justify-center align-center">
      <!-- <avatar  v-if="user" :username="user.fullName"></avatar> -->
    </section>
    <section class="user-content flex wrap">
      <div class="user-details-info flex column wrap">
        {{ user.fullName }}
        {{ user.email }}
      </div>
      <div class="flex column wrap">
        <h2>board</h2>
        <h2>board</h2>
        <h2>board</h2>
        <h2>board</h2>
      </div>
      <div class="left-task">
        <p>You have 4 left tasks</p>
      </div>
    </section>
  </section>
</template>

<script>
// import Avatar from 'vue-avatar'

export default {
  name: 'user-details',
 
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  created(){
        const { userId } = this.$route.params;
        this.$store.dispatch({type:'loadUser',userId})
  },
  components:{
    // Avatar
  }
}
</script>
