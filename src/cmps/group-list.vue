<template>
  <section v-if="groups.length" class="group-list">
<<<<<<< HEAD
    <h2>Board: {{ boardName }}</h2>
=======
    <h2>{{ boardName }}</h2>
>>>>>>> 7b84609878a17cacd584019e8a33014af1fdc2ce
    <ul class="clean list flex column align-center justify-center gap">
      <group-preview v-for="group in groups" :key="group._id" :group="group" />
    </ul>
  </section>
</template>

<script>
import groupPreview from "@/cmps/group-preview.vue";

export default {
  name: "group-list",
  props: {
    groups: Array,
<<<<<<< HEAD
    boardName: String
  },
  components: {
    groupPreview
  }
=======
    boardName: String,
  },
  components: {
    groupPreview,
  },
>>>>>>> 7b84609878a17cacd584019e8a33014af1fdc2ce
};
</script>
