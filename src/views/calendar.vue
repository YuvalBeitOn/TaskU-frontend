<template> 
<section class="calender">

</section>

</template>

<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.user;
    },
  },

  created() {
      console.log('tasks:', this.loggedInUser);
  }
};
</script>

<style></style>
