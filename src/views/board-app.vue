<template>
  <section v-if="!isLoading" class="board-app flex">
    <board-list
      v-if="isListExpanded"
      @removeBoard="removeCurrBoard"
      @addNewBoard="addBoard"
      :boards="boards"
      title="Boards"
    >
      <board-search @searchBoard="setSearch" slot="search" />
    </board-list>
    <div
      @click="toggleExpandList"
      class="expand-btn-container"
      :style="expendStyle"
    >
      <button
        :class="{ 'expand-list-btn': true, notExpanded: !isListExpanded }"
      >
        <i
          v-tooltip.right="'Expend/Hide List'"
          :class="expendBtnStyle"
        ></i>
      </button>
    </div>

    <div class="board-app-container width100">
      <div v-if="board" class="board-up">
        <div class="board-header-top flex space-between">
          <div class="header-board-details flex column">
            <h2
              class="board-name-title editable"
              @blur="updateBoardName"
              @keydown.enter="updateBoardName"
              contenteditable
            >
              {{ board.name }}
            </h2>
            <h3
              class="board-descriotion editable"
              v-if="board.description"
              @blur="updateBoardDescription"
              @keydown.enter="updateBoardDescription"
              contenteditable
            >
              {{ board.description }}
            </h3>
          </div>
          <div class="board-header-nav flex wrap">
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
            </el-badge>
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
            <div class="control-chat-ap">
  <el-switch v-tooltip.top="chatControl"
    v-model="isChatingBtnShown">
  </el-switch>

            </div>
          </div>
        </div>

        <div class="board-control flex space-between">
          <h4 class="board-creator">By: {{ board.creator.fullName }}</h4>
          <board-filter
            v-if="board"
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
        @updateGroups="updateGroups"
        @duplicateGroup="duplicateGroup"
        @forceRender="forceRerender"
      />
      <div v-if="isTaskDetailsHover" class="backdrop-layer"></div>
    </div>
    <task-details
      v-if="this.$route.params.taskId"
      @close="isTaskDetailsHover = false"
      @mouseover.native="isTaskDetailsHover = true"
      @mouseleave.native="isTaskDetailsHover = false"
    />
    <div v-tooltip.top="'Chat Board'" v-show="isChatingBtnShown" class="chat-icon-btn-container flex align-center justify-center">

    <i  @click="toggleChat" class="fas chat-icon fa-comments"></i>
    </div>
  <chat-app @closeChat="toggleChat" v-if="isChating" />
  </section>
  <div v-else class="flex justify-center align-center">
    <img src="@/assets/imgs/loader.gif" class="loader-app" />
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import chatApp from '@/cmps/board-chat'
import addMembers from '@/cmps/add-members'
import groupList from '@/cmps/group-list'
import boardList from '@/cmps/board-list.vue'
import taskDetails from '../views/task-details'
import { boardService } from '@/services/board.service'
import boardFilter from '@/cmps/board-filter.vue'
import boardSearch from '@/cmps/board-search'
import { utilService } from '@/services/util.service'

export default {
  name: 'board-app',
  data() {
    return {
      isChatingBtnShown:true,
      isChating:false,
      isListExpanded: true,
      isMembersShowen: false,
      currTaskDetails: null,
      isTaskDetailsHover: false,
      componentKey: 0
    }
  },
  computed: {
    chatControl(){
      return this.isChatingBtnShown ? 'Hide Chat' : 'Show Chat'
    },
    expendStyle() {
      return this.isListExpanded
        ? { borderLeft: 1 + 'px' + ' solid ' + 'rgb(228, 228, 228)' }
        : { marginLeft: 15 + 'px' }
    },
    expendBtnStyle() {
      return this.isListExpanded
        ? 'expend-btn fas fa-chevron-left'
        : 'expend-btn fas fa-chevron-right'
    },
    isLoading() {
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
    toogleChatBtn(){
      this.isChatingBtnShown = !this.isChatingBtnShown
    },
    toggleExpandList() {
      this.isListExpanded = !this.isListExpanded
    },
    toggleChat(){
      this.isChating=!this.isChating
    },
    duplicateGroup(group) {
      group.id = utilService.makeId()
      this.board.groups.push(group)
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
      this.forceRerender()
    },

    updateBoardName(ev) {
      this.board.name = ev.target.innerText
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
      this.forceRerender()
    },
    updateBoardDescription(ev) {
      this.board.description = ev.target.innerText
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
     Swal.fire({
  title: 'Enter your Board Name',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: true,
  confirmButtonText: 'Create A Board',
  showLoaderOnConfirm: true,
}).then((result) => {
  if (result.isConfirmed) {
    const board = boardService.getEmptyBoard()
    board.name = result.value
    this.$store.dispatch({ type: 'saveBoard', board })
  }
})
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
      this.forceRerender()
    },
    deleteGroup(groupId) {
      const idx = this.board.groups.findIndex(group => group.id === groupId)
      this.board.groups.splice(idx, 1)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.forceRerender()
    },
    updateGroup(updatedGroup) {
      const idx = this.board.groups.findIndex(
        group => group.id === updatedGroup.id
      )
      this.board.groups.splice(idx, 1, updatedGroup)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.forceRerender()
    },
    updateGroups(groups) {
      this.board.groups = groups
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.forceRerender()
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
    boardSearch,
    chatApp
  }
}
</script>
