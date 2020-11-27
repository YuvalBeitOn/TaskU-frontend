<template>
  <section class="board-app flex">
    <board-list
      @searchBoard="setSearch"
      @removeBoard="removeCurrBoard"
      @addNewBoard="addBoard"
      :boards="boards"
    />
    <div class="width100">
      <div v-if="board" class="board-control">
        <h2>{{ board.name }}</h2>
        <board-filter />
        <button @click="addGroup">New Group</button>
        <div>
          <button @click="toggleMembers">+</button>
          <members v-if="isMembersShowen">
            <h2 slot="title-members">Members board</h2>
            <ul v-if="board.members" class="clean-list" slot="members">
              <li v-for="member in board.members" :key="member._id">
                {{ member.fullName }} {{ member._id }}
                <button @click="removeUserFromBoard(member._id)">-</button>
              </li>
            </ul>
            <h2 slot="title-all-members">site users</h2>
            <ul class="clean-list" slot="all-members">
              <li v-for="user in usersSite" :key="user._id">
                {{ user.fullName }}{{ user._id }}
                <button @click="addUserToBoard(user)">+</button>
              </li>
            </ul>
          </members>
        </div>
      </div>
      <group-list
        v-if="board"
        :groups="board.groups"
        :boardName="board.name"
        @deleteGroup="deleteGroup"
      />
    </div>
    <task-details v-if="this.$route.params.taskId" :task="currTask" />
  </section>
</template>

<script>
import members from '@/cmps/members'
import groupList from '@/cmps/group-list'
import boardList from '@/cmps/board-list.vue'
import taskDetails from '../views/task-details'
import { boardService } from '@/services/board.service'
import { eventBus } from '@/services/event-bus.service'

import boardFilter from '@/cmps/board-filter.vue'

export default {
  name: 'board-app',
  data() {
    return {
      isMembersShowen: false,
      currTask: null,
       isRouterViewHover: false,
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    boards() {
      return this.$store.getters.boards
    },
    usersSite() {
      const siteUsers = this.$store.getters.users
      const boardMembers = this.board.members
      const filteredSiteUsers = siteUsers.filter((siteUser) => {
        return boardMembers.every((boardMember) => {
          return boardMember._id !== siteUser._id
        })
      })
      console.log('filteredSiteUsers:', filteredSiteUsers)
      return filteredSiteUsers
    },
  },
  methods: {
    addUserToBoard(user) {
      this.board.members.unshift(user)
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
    },
    removeUserFromBoard(userId) {
      const idx = this.board.members.findIndex(
        (bMember) => bMember._id === userId
      )
      this.board.members.splice(idx, 1)
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
    },
    setSearch(searchBoard) {
      this.$store.commit({ type: 'setSearch', searchBoard })
      this.$store.dispatch({ type: 'loadBoards' })
    },

    removeCurrBoard(boardId) {
      this.$store.dispatch({ type: 'removeBoard', boardId })
    },
    addBoard() {
      const board = boardService.getEmptyBoard()
      this.$store.dispatch({ type: 'saveBoard', board })
    },

    loadBoard() {
      this.$store.dispatch({
        type: 'loadBoard',
        boardId: this.$route.params.boardId,
      })
    },
    addGroup() {
      const newGroup = boardService.getEmptyGroup()
      this.board.groups.push(newGroup)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board,
      })
    },
    deleteGroup(groupId) {
      const idx = this.board.groups.findIndex((group) => group.id === groupId)
      this.board.groups.splice(idx, 1)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board,
      })
    },
    setCurrTask(task) {
      this.currTask = task
    },
    toggleMembers() {
      this.isMembersShowen = !this.isMembersShowen
    },
  },
  

  watch: {
        '$route.params.boardId'(val) {
            if (val) {
                this.loadBoard()
            }
        },},
        
  created() {
    eventBus.$on('taskDetails', this.setCurrTask)
    this.$store.dispatch({ type: 'loadUsers' })
    this.$store.dispatch({ type: 'loadBoards' })
    this.loadBoard()
  },
  components: {
    groupList,
    boardList,
    boardFilter,
    members,
    taskDetails,
  }
}
</script>