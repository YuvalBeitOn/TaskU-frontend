<template>
  <side-bar @closeBtn="closeBtn">
    <section class="members-list-section">
      <h3 class="title-members">Members</h3>
      <ul class="clean-list first members-list">
        <li
          class="member flex align-center space-between"
          v-for="member in members"
          :key="member._id"
        >
          <div class="user-container flex align-center">
            <avatar class="user-avatar" :user="member" :size="25" />
            <span class="member-name">{{ member.fullName }}</span>
          </div>
          <button @click.stop="goToUserDetails(member._id)" class="member-list-btn">
            <span class="blue">Contact</span>
          </button>
        </li>
      </ul>
    </section>
  </side-bar>
</template>

<script>
import sideBar from './sidebar'
import avatar from './user-avatar'
export default {
  props: {
    members: Array
  },
  components: { sideBar, avatar },
  methods: {
    closeBtn() {
      this.$emit('close')
    },
    goToUserDetails(id) {
      this.$router.push(`/user/${id}`)
    }
  }
}
</script>

<style></style>
