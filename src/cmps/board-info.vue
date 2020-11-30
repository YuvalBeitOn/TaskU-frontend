<template>
  <div v-if="board" class="board-info">
    <div
      class="back-drop-layer"
      v-if="isMembersShowen"
      @click.prevent="isMembersShowen = false"
    ></div>
    <el-badge :value="board.members.length" class="item" type="primary">
      <button
        v-tooltip.top="'Board Members'"
        @click="toggleMembers"
        class="btn-close"
      >
        <i class="icon-nav-hader far fa-user-circle fa-icon"></i>
      </button>
      <add-members
        v-if="isMembersShowen"
        firstTitle="Board Member"
        secondTitle="Users Site"
        :members="board.members"
        :allMembers="filteredUsers"
      />
    </el-badge>
    <el-switch v-model="isChatingBtnShown">
</el-switch>
  </div>
</template>

<script>
import addMembers from './add-members'
export default {
  props: {
    board: Object
  },
  data() {
    return {
      isMembersShowen: false,
      isChatingBtnShown:true
    }
  },
  computed: {
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
    toggleMembers() {
      this.isMembersShowen = !this.isMembersShowen
    }
  },
  components: {
    addMembers
  }
}
</script>

<style></style>
