<template>
  <section class="members">
    <h3 class="title-members">{{ firstTitle }}</h3>
    <ul class="clean-list first add-members-list">
      <li class="member flex align-center" v-for="member in members" :key="member._id">
        <div @click.stop="goToUserDetails(member._id)" class="user-dateils-container flex align-center">
        <avatar :user="member" :size="25" />

        <span class="member-name">{{ member.fullName }}</span>
        </div>
        <div class="action-container flex align-center">

        <i
          @click.stop="emitRemoveMember(member)"
          class="action-icon fas fa-minus"
        ></i>
        </div>
      </li>
    </ul>
    <h3 class="title-members">{{ secondTitle }}</h3>
    <ul class="add-members-list clean-list">
      <li
        class="member flex align-center"
        v-for="aMember in allMembers"
        :key="aMember._id"
      >
              <div @click.stop="goToUserDetails(aMember._id)" class="user-dateils-container flex align-center">

        <avatar :user="aMember" :size="25" />
        <span class="member-name">{{ aMember.fullName }}</span>
        </div>
        <div class="action-container flex align-center">

        <i
          @click.stop="emitAddMember(aMember)"
          class="action-icon fas fa-plus"
        ></i>
        </div>

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
       goToUserDetails(id) {
       console.log('id:', id)
      this.$router.push(`/user/${id}`)
    },
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

