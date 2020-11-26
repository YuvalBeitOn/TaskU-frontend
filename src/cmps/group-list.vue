<template>
<<<<<<< HEAD
  <section v-if="groups.length" class="group-list">
    <h2>Board: {{ boardName }}</h2>
    <ul class="clean list flex column align-center justify-center gap">
      <!-- <group-preview v-for="group in groups" :key="group._id" :group="group" /> -->
=======
  <section v-if="groups.length" class="group-list container">
    <h2>{{ boardName }}</h2>
    <ul class="clean-list flex column align-center justify-center gap width100">
      <group-preview v-for="group in groups" :key="group._id" :group="group" />
>>>>>>> 897b84bf765fb1b3402272d356b3c12e721bb9ff
    </ul>
  </section>
</template>

<script>
// import groupPreview from "@/cmps/group-preview.vue";

export default {
  name: "group-list",
  props: {
    groups: Array,
    boardName: String,
  },
  components: {
    // groupPreview,
  },
};
</script>
