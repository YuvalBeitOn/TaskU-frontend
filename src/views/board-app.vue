<template>
  <section v-if="!isLoading" class="board-app flex">
    <board-list
      @removeBoard="removeCurrBoard"
      @addNewBoard="addBoard"
      :boards="boards"
      title="Board"
    >
      <board-search @searchBoard="setSearch" slot="search" />
    </board-list>
    <div class="board-app-container width100">
      <div v-if="board" class="board-up">
        <div class="board-up-header flex space-between">
            <h2 class="board-name-title"   @blur="updateBoardName"
        @keyup.enter="updateBoardName"
        contenteditable>
          {{ board.name }}</h2>
          
          <i @click="toggleMembers" class="far fa-user-circle fa-icon"></i>
    <div class="close-popup" v-if="isMembersShowen" @click.prevent="isMembersShowen=false"></div>
          <add-members
            class="right"
            v-if="isMembersShowen"
            firstTitle="Board Member"
            secondTitle="Users Site"
            :members="board.members"
            :allMembers="usersSite"
            @removeMember="removeUserFromBoard"
            @addMember="addUserToBoard"
          />
        </div>
        <h3 v-if="board.description" @blur="updateBoardDescription"
        @keyup.enter="updateBoardDescription"
        contenteditable>{{board.description}}</h3>
        <div class="board-control">
          
          <board-filter
            v-if="board"
            :creator="board.creator"
            :statuses="board.statuses"
            :priorities="board.priorities"
            @addGroup="addGroup"
            @forceRerender="forceRerender"
          />
        </div>
        <!-- <button @click="addGroup">New Group</button> -->
      </div>
      <group-list
        v-if="board"
        :key="componentKey"
        :groups="board.groups"
        :boardName="board.name"
        @deleteGroup="deleteGroup"
        @updateGroup="updateGroup"
        @forceRender="forceRerender"
      />
      <div v-if="isTaskDetailsHover" class="backdrop-layer"></div>
    </div>
      <task-details
        v-if="currTaskDetails && this.$route.params.taskId"
        @close="isTaskDetailsHover = false"
        @mouseover.native="isTaskDetailsHover = true"
        @mouseleave.native="isTaskDetailsHover = false"
        :task="currTaskDetails.task"
        :groupId="currTaskDetails.groupId"
      />
    </section>
    <div v-else class="flex justify-center align-center">
    <img  src="@/assets/imgs/loader.gif" class="loader-app">

    </div>
</template>

<script>
import addMembers from '@/cmps/add-members'
import groupList from '@/cmps/group-list'
import boardList from '@/cmps/board-list.vue'
import taskDetails from '../views/task-details'
import { boardService } from '@/services/board.service'
import { eventBus } from '@/services/event-bus.service'
import boardFilter from '@/cmps/board-filter.vue'
import boardSearch from '@/cmps/board-search'

export default {
  name: 'board-app',
  data() {
    return {
      isMembersShowen: false,
      currTaskDetails: null,
      isTaskDetailsHover: false,
      componentKey: 0
    }
  },
  computed: {
    isLoading(){
      return this.$store.getters.isLoading
    },
    board() {
      return this.$store.getters.board
    },
    boards() {
      return this.$store.getters.boards
    },
    usersSite() {
      const siteUsers = this.$store.getters.users
      const boardMembers = this.board.members
      const filteredSiteUsers = siteUsers.filter(siteUser => {
        return boardMembers.every(boardMember => {
          return boardMember._id !== siteUser._id
        })
      })
      return filteredSiteUsers
    }
  },
  methods: {
    updateBoardName(ev){
        console.log(ev.target.innerText,'target')
        this.board.name =  ev.target.innerText
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
      this.forceRerender()
    },
        updateBoardDescription(ev){
        console.log(ev.target.innerText,'target')
        this.board.description =  ev.target.innerText
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
      this.forceRerender()
    },

    forceRerender() {
      this.componentKey += 1
    },
    toggleMembers() {
      this.isMembersShowen = !this.isMembersShowen
    },
    addUserToBoard(user) {
      console.log('user:', user)
      this.board.members.unshift(user)
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
    },
    removeUserFromBoard(userId) {
      const idx = this.board.members.findIndex(
        bMember => bMember._id === userId
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
        boardId: this.$route.params.boardId
      })
    },
    addGroup() {
      const newGroup = boardService.getEmptyGroup()
      this.board.groups.push(newGroup)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
    },
    deleteGroup(groupId) {
      const idx = this.board.groups.findIndex(group => group.id === groupId)
      this.board.groups.splice(idx, 1)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
    },
    updateGroup(updatedGroup) {
      console.log(updatedGroup.name)
      const idx = this.board.groups.findIndex(
        group => group.id === updatedGroup.id
      )
      this.board.groups.splice(idx, 1, updatedGroup)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
    },
    updateGroups(groups) {
      this.board.groups = groups
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.forceRerender()
    },
    setCurrTaskDetails(currTaskDetails) {
      console.log(currTaskDetails, 'Setting currTaskDetails')
      this.currTaskDetails = currTaskDetails
    }
  },
  watch: {
    '$route.params.boardId'(val) {
      if (val) {
        this.loadBoard()
        this.forceRerender()
      }
    }
  },
  created() {
    eventBus.$on('taskDetails', this.setCurrTaskDetails)
    this.$store.dispatch({ type: 'loadUsers' })
    this.$store.dispatch({ type: 'loadUser', userId: '301' })
    this.$store.dispatch({ type: 'loadBoards' })
    this.loadBoard()
  },
  components: {
    groupList,
    boardList,
    boardFilter,
    addMembers,
    taskDetails,
    boardSearch
  }
}
</script>
