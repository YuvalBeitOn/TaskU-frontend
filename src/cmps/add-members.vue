<template>
  <section class="members">
    <h3 class="title-members">{{ firstTitle }}</h3>
    <ul class="clean-list first members-list">
      <li class="flex align-center" v-for="member in members" :key="member._id">
        <avatar
          backgroundColor="#0085ff"
          :size="20"
          :username="member.fullName"
        ></avatar>
        <span class="member-name">{{ member.fullName }}</span>
        <i
          @click.stop="emitRemoveMember(member)"
          class="action-icon fas fa-minus"
        ></i>
      </li>
    </ul>
    <h3 class="title-members">{{ secondTitle }}</h3>
    <ul class="clean-list members-list">
      <li
        class="flex align-center"
        v-for="aMember in allMembers"
        :key="aMember._id"
      >
        <avatar
          backgroundColor="#0085ff"
          :size="20"
          :username="aMember.fullName"
        ></avatar>
        <span class="member-name">{{ aMember.fullName }}</span>
        <i
          @click.stop="emitAddMember(aMember)"
          class="action-icon fas fa-plus"
        ></i>
      </li>
    </ul>
  </section>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  props: {
    members: Array,
    allMembers: Array,
    firstTitle: String,
    secondTitle: String
  },
  methods: {
    emitAddMember(member) {
      this.$emit('addMember', member)
    },
    emitRemoveMember(member) {
      this.$emit('removeMember', member)
    }
  },
  components: {
    Avatar
  }
}
</script>

<style></style>
