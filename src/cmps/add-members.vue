<template>
  <section class="members">
    <h3 class="title-members">{{ firstTitle }}</h3>
    <ul class="clean-list first members-list">
      <li class="member flex align-center" v-for="member in members" :key="member._id">
        <avatar :user="member" :size="20"/>

        <span class="member-name">{{ member.fullName }}</span>
        <i
          @click.stop="emitRemoveMember(member)"
          class="action-icon fas fa-minus"
        ></i>
      </li>
    </ul>
    <h3 class="title-members">{{ secondTitle }}</h3>
    <ul class="members-list clean-list">
      <li
        class="member flex align-center"
        v-for="aMember in allMembers"
        :key="aMember._id"
      >
        <avatar :user="aMember" :size="20"/>
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
import Avatar from '@/cmps/user-avatar.vue'

export default {
  props: {
    members: Array,
    allMembers: Array,
    firstTitle: String,
    secondTitle: String,
  },
  methods: {
    emitAddMember(member) {
      this.$emit('addMember', member)
    },
    emitRemoveMember(member) {
      this.$emit('removeMember', member)
    },
  },
  components: {
    Avatar,
  },
}
</script>

<style></style>
