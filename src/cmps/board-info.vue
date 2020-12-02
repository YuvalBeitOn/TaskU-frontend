<template>
  <div v-if="board" class="board-info">
      <members :hiddenBadge="membersLegnth" :size="25" toolTipTxt="Board Members" classIcon="icon-nav-hader" :members="board.members">
      <add-members slot="add-members"
      
        class="top-right"
        @removeMember="emitRemoveMember"
        @addMember="emitAddMember"
        firstTitle="Board Members"
        secondTitle="Users Site"
        :members="board.members"
        :allMembers="filteredUsers"
       />
    </members>
  </div>
</template>

<script>
import members from './members'
import addMembers from './add-members'
export default {
  props: {
    board: Object
  },
  data() {
    return {
    }
  },
  computed: {
    membersLegnth(){
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

    emitRemoveMember(member) {
      this.$emit('removeMember', member)
    },
    emitAddMember(member) {
      this.$emit('addMember', member)
    }
  },

  components: {
    addMembers,
    members
  }
}
</script>

<style></style>
