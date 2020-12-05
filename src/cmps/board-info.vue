<template>
  <div v-if="board" class="board-info flex justify-center align-center">
    <div class="btn-members-container">
      <members
        :hiddenBadge="membersLegnth"
        :size="35"
        toolTipTxt="Board Members"
        classIcon="icon-nav-hader"
        :members="board.members"
      >
        <add-members
          slot="add-members"
          class="top-right"
          @removeMember="emitRemoveMember"
          @addMember="emitAddMember"
          firstTitle="Board Members"
          secondTitle="Invite Friends"
          :members="board.members"
          :allMembers="filteredUsers"
        />
      </members>
    </div>
    <div class="btn-activity-container">
      <button
        v-tooltip.top="'contect with your memberes'"
        class="btn-close btn-second btn-activity"
        @click="toggleMembersList"
      >
        <i class="far fa-users"></i> /<span
          v-if="board.members.length"
          class="blue"
          >{{ board.members.length }}</span
        >
      </button>
      <members-list
        @close="toggleMembersList"
        :members="board.members"
        v-if="isMembersShown"
      />
    </div>

    <div class="btn-booard-activity-container">
      <button
        v-tooltip.top="'Board activity'"
        class="btn-close btn-second "
        @click="boardActivities"
      >
        Activities /
        <span v-if="activiitesLength" class="blue">{{ activiitesLength }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import members from './members'
import addMembers from './add-members'
import membersList from './members-list'
export default {
  props: {
    board: Object
  },
  data() {
    return {
      isMembersShown: false,
      darkMode: false
    }
  },
  computed: {
    activiitesLength() {
      const boardActiviites = this.$store.getters.boardActivities
      if (!boardActiviites.length || boardActiviites.length <= 0) return '0'
      console.log('boardActiviites.length:', boardActiviites.length)
      return boardActiviites.length
    },
    membersLegnth() {
      return this.board.members.length > 3 ? false : true
    },
    filteredUsers() {
      const users = this.$store.getters.users
      const boardMembers = this.board.members
      const filteredUsers = users.filter(user => {
        return boardMembers.every(boardMember => {
          return boardMember._id !== user._id
        })
      })
      return filteredUsers
    }
  },
  methods: {
    boardActivities() {
      this.$router.push(`/board/${this.$route.params.boardId}/activities`)
    },
    emitRemoveMember(member) {
      this.$emit('removeMember', member)
    },
    emitAddMember(member) {
      this.$emit('addMember', member)
    },
    toggleMembersList() {
      this.isMembersShown = !this.isMembersShown
    }
  },

  components: {
    addMembers,
    members,
    membersList
  }
}
</script>

<style></style>
