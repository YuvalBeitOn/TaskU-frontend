<template>
  <section class="board-app flex" >
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
        contenteditable>{{ board.name }}</h2>
          <i  @click="toggleMembers" class="far fa-user-circle fa-icon"></i>
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
      </div>
      <group-list
        v-if="board"
        :key="componentKey"
        :groups="board.groups"
        :boardName="board.name"
        @deleteGroup="deleteGroup"
        @updateGroup="updateGroup"
      />
      <div v-if="isRouterViewHover" class="backdrop-layer"></div>
    </div>
    <router-view
      v-if="currTaskDetails"
      @updateTaskTxt="updateTaskTxt"
      @close="isRouterViewHover = false"
      class="boardapp-nested"
      @mouseover.native="isRouterViewHover = true"
      @mouseleave.native="isRouterViewHover = false"
      :task="currTaskDetails.task"
      :groupId="currTaskDetails.groupId"
    />
    <task-details v-if="this.$route.params.taskId" :task="currTask" />
  </section>
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
      isRouterViewHover: false,
      componentKey: 0
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    boards() {
      return this.$store.getters.boards
    },
    user(){
      return this.$store.getters.user 
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
    forceRerender() {
      this.componentKey += 1
    },
    updateBoardName(ev){
        console.log(ev.target.innerText,'target')
        this.board.name =  ev.target.innerText
      this.$store.dispatch({ type: 'saveBoard', board: this.board })

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
      board.creator = this.user
      console.log('board:', board.creator)
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
    setCurrTaskDetails(currTaskDetails) {
      console.log(currTaskDetails, 'Setting currTaskDetails')
      this.currTaskDetails = currTaskDetails
    },
    // getGroupById(groupId) {
    //     const idx = this.board.groups.findIndex(
    //         (group) => group.id === groupId
    //     )
    //     return this.board.groups[idx]
    // },
    updateTaskTxt(taskDetails) {
      const newTask = taskDetails.task
      const groupIdx = this.board.groups.findIndex(
        group => group.id === taskDetails.groupId
      )
      const group = this.board.groups[groupIdx]
      const taskIdx = group.tasks.findIndex(task => task.id === newTask.id)
      group.tasks.splice(taskIdx, 1, newTask)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
    }
  },
  watch: {
    '$route.params.boardId'(val) {
      if (val) {
        this.loadBoard()
      }
    }
  },
  created() {
    eventBus.$on('taskDetails', this.setCurrTask)
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
