<template>
  <section v-if="groups.length" class="group-container">
    <ul class="group-list clean-list flex column align-center justify-center gap width100">
      <group-preview
        v-for="group in groups"
        :key="group._id"
        :group="group"
        :deleteGroup="emitDelete"
        @updateGroup="updateGroup"
      />
    </ul>
  </section>
</template>
<script>
import groupPreview from '@/cmps/group-preview.vue'

export default {
  name: 'group-list',
  props: {
    groups: Array
  },
  components: {
    groupPreview
  },
  methods: {
    emitDelete(groupId) {
      this.$emit('deleteGroup', groupId)
    },
    updateGroup(group) {
      this.$emit('updateGroup', group)
    }
  }
}
</script>
