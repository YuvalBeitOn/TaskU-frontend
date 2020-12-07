<template>
    <section v-if="board" class="board-app flex">
        <board-list
            :expandList="expandList"
            :isExpanded="isListExpanded"
            @removeBoard="removeCurrBoard"
            @addNewBoard="addBoard"
            :boards="boards"
            title="Boards">
            <button
                slot="expand-btn"
                @click="toggleExpandList"
                :class="{
                    'expand-list-btn': true,
                    notExpanded: !isListExpanded,
                }"
            >
                <i
                    :class="btnClassExpend"
                    v-tooltip.right="'Expand/Hide List'"
                ></i>
            </button>
            <board-search @searchBoard="setSearch" slot="search" />
        </board-list>
        <div :class="['board-app-container width100', darkMode]">
            <board-header
                :updateBoardName="updateBoardName"
                :updateBoardDesc="updateBoardDesc"
                :board="board"
                :addGroup="addGroup"
                @removeMember="removeBoardMember"
                @addMember="addBoardMember"
                :displayMode="displayMode"
                :forceRerender="forceRerender"
                @setDisplayMode="setDisplayMode"
            />
            <group-list
                v-if="board && displayMode === 'Board'"
                :key="componentKey"
                :groups="board.groups"
                :boardName="board.name"
                @deleteGroup="deleteGroup"
                @updateGroup="updateGroup"
                @updateGroups="updateGroups"
                @duplicateGroup="duplicateGroup"
                @forceRender="forceRerender"
            />
            <trello-mode
                :key="componentKey"
                @forceRender="forceRerender"
                v-else
            ></trello-mode>
        </div>
        <div v-if="isTaskDetailsHover" class="backdrop-layer"></div>
        <!-- <task-details
      v-if="this.$route.params.taskId"
      @close="isTaskDetailsHover = false"
      @mouseover.native="isTaskDetailsHover = true"
      @mouseleave.native="isTaskDetailsHover = false"
    /> -->
        <router-view :class="['grow', darkMode]" />
        <div
            v-tooltip.top="'Chat Board'"
            v-show="isChatingBtnShown"
            class="chat-icon-btn-container flex align-center justify-center"
        >
            <i
                @click="toggleChat"
                class="fas chat-icon fa-comments relative"
            ></i>
        </div>
        <chat-app @closeChat="toggleChat" v-if="isChating" />
    </section>
    <div v-else class="flex justify-center align-center">
        <img src="@/assets/imgs/loader.gif" class="loader-app" />
    </div>
</template>
<script>
import { eventBus } from '@/services/event-bus.service'
import chatApp from '@/cmps/board-chat'
import groupList from '@/cmps/group-list'
import boardList from '@/cmps/board-list.vue'
import { boardService } from '@/services/board.service'
import boardSearch from '@/cmps/board-search'
import { utilService } from '@/services/util.service'
import boardHeader from '../cmps/board-header.vue'
// import { socketService } from '@/services/socket.service.js'
import trelloMode from '@/cmps/Trello/trello-mode'
export default {
  name: 'board-app',
  data() {
    return {
      isChatingBtnShown: true,
      isChating: false,
      isListExpanded: true,
      isMembersShowen: false,
      currTaskDetails: null,
      isTaskDetailsHover: false,
      componentKey: 0
    }
  },
  computed: {
    // NOT  REMOVE THIS FUNC !!!!!!!!!!
    darkMode() {
      return this.$store.getters.getDarkModeToggle
    },
    displayMode() {
      return this.$store.getters.displayMode
    },
    btnClassExpend() {
      return this.isListExpanded
        ? 'expend-btn fas fa-chevron-left'
        : 'expend-btn fas fa-chevron-right'
    },
    chatControl() {
      return this.isChatingBtnShown ? 'Hide Chat' : 'Show Chat'
    },
    user() {
      return this.$store.getters.user
    },
    miniUser(){
      return this.$store.getters.miniUser
    },
    board() {
      return this.$store.getters.board
    },
    boards() {
      return this.$store.getters.boards
    }
  },
  methods: {
    setDisplayMode(displayMode) {
      this.$store.commit({ type: 'setDisplayMode', displayMode })
    },
    toogleChatBtn() {
      this.isChatingBtnShown = !this.isChatingBtnShown
    },
    expandList() {
      this.isListExpanded = true
    },
    toggleExpandList() {
      this.isListExpanded = !this.isListExpanded
    },
    toggleChat() {
      this.isChating = !this.isChating
    },
    duplicateGroup(group) {
      group.id = utilService.makeId()
      this.board.groups.push(group)
      const txt = `${this.user.fullName} duplicated group the group ${group.name} `
      let newActivity = boardService.getEmptyActivity(txt, this.miniUser)
      this.board.activities.push(newActivity)
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
      this.$store.dispatch({ type: 'updateBoard', board: this.board })
      this.forceRerender()
    },
    updateBoardName(ev) {
      ev.target.blur()
      if (ev.target.innerText === this.board.name) return
      else {
        this.board.name = ev.target.innerText
        const txt = `${this.user.fullName} update Board name`
        let newActivity = boardService.getEmptyActivity(txt, this.miniUser)
        this.board.activities.push(newActivity)
        this.$store.dispatch({ type: 'saveBoard', board: this.board })
        this.$store.dispatch({ type: 'updateBoard', board: this.board })
        this.$notify({
          message: 'Board name updated',
          position: 'bottom-left',
          duration: 2000
        })
        this.forceRerender()
      }
    },
    updateBoardDesc(ev) {
      ev.target.blur()
      if (ev.target.innerText === this.board.description) return
      else {
        this.board.description = ev.target.innerText
        const txt = `${this.user.fullName} update Board description`
        let newActivity = boardService.getEmptyActivity(txt, this.miniUser)
        this.board.activities.push(newActivity)
        this.$store.dispatch({ type: 'saveBoard', board: this.board })
        this.$notify({
          message: 'Board description updated',
          position: 'bottom-left',
          duration: 2000
        })
        this.forceRerender()
      }
    },
    forceRerender() {
      this.componentKey += 1
    },
    addBoardMember(user) {
      this.board.members.unshift(user)
      const txt = `${this.user.fullName} add ${user.fullName} to Board`
      let newActivity = boardService.getEmptyActivity(txt, this.miniUser)
      this.board.activities.push(newActivity)
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
      this.$notify({
        message: 'New member added to board',
        position: 'bottom-left',
        duration: 2000
      })
    },
    removeBoardMember(member) {
      const idx = this.board.members.findIndex(
        bMember => bMember._id === member._id
      )
      this.board.members.splice(idx, 1)
      const txt = `${this.user.fullName} remove  ${member.fullName} from Board`
      let newActivity = boardService.getEmptyActivity(txt, this.miniUser)
      this.board.activities.push(newActivity)
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
      this.$notify({
        message: 'Member removed from board',
        position: 'bottom-left',
        duration: 2000
      })
    },
    setSearch(searchBoard) {
      this.$store.commit({ type: 'setSearch', searchBoard })
      this.$store.dispatch({ type: 'loadBoards' })
    },
    async removeCurrBoard(boardId) {
      try {
        const board = boardService.getById()
        if (board.creator._id !== this.user_id) {
          return
        }
        await this.$confirm(
          'This will permanently delete the board. Continue?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        )
        const txt = `${this.user.fullName} remove Board`
        let newActivity = boardService.getEmptyActivity(txt, this.miniUser)
        this.board.activities.push(newActivity)
        this.$store.dispatch({ type: 'removeBoard', boardId })
        this.$store.dispatch({
          type: 'loadAllBoards',
          boards: this.boards
        })
        this.$notify({
          message: 'Board deleted',
          position: 'bottom-left',
          duration: 2000
        })
        this.$message({
          type: 'success',
          message: 'Delete completed'
        })
      } catch (err) {
          this.$message({
            durtion: 2000,
            showClose: true,
            type: 'error',
            offset: 335,
            message: 'Only the creator can delete the board!'
          })
      }
    },
    loadBoards() {
      this.$store.dispatch({ type: 'loadBoards' })
      this.forceRerender()
    },
    async addBoard() {
      try {
        const res = await this.$prompt(
          'Please enter a name to your board',
          'Add New Board',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
          }
        )
        const board = boardService.getEmptyBoard()
        board.name = res.value
        board.creator = this.miniUser
        board.members.push(this.miniUser)
        const txt = `${this.miniUser.fullName} create this Board`
        let newActivity = boardService.getEmptyActivity(txt, this.miniUser)
        this.board.activities.push(newActivity)
        this.$store.dispatch({ type: 'saveBoard', board })
        this.$message({
          type: 'success',
          duration: 2500,
          message: 'Your Board:' + res.value + ' add '
        })
      } catch (err) {
        this.$message({
          type: 'info',
          duration: 2500,
          message: 'Your action canceled'
        })
      }
    },
    async loadBoard() {
      try {
        await this.$store.dispatch({
          type: 'loadBoard',
          boardId: this.$route.params.boardId
        })
      } catch (e) {
        console.log('Erororor!!')
      }
    },
    addGroup() {
      const newGroup = boardService.getEmptyGroup()
      this.board.groups.push(newGroup)
      const txt = `${this.user.fullName} has added a new group!`
      let newActivity = boardService.getEmptyActivity(txt, this.miniUser)
      this.board.activities.push(newActivity)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.$notify({
        message: 'New group added',
        position: 'bottom-left',
        duration: 2000
      })
      this.forceRerender()
    },
    deleteGroup(groupId) {
      const idx = this.board.groups.findIndex(group => group.id === groupId)
      const txt = `${this.user.fullName} deleted group ${this.board.groups[idx].txt}`
      this.board.groups.splice(idx, 1)
      let newActivity = boardService.getEmptyActivity(txt, this.miniUser)
      this.board.activities.push(newActivity)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.$notify({
        message: 'Group deleted',
        position: 'bottom-left',
        duration: 2000
      })
      this.forceRerender()
    },
    updateGroup(updatedGroup) {
      const idx = this.board.groups.findIndex(
        group => group.id === updatedGroup.id
      )
      if (idx < 0) return
      this.board.groups.splice(idx, 1, updatedGroup)
      const txt = `${this.user.fullName} updated group ${updatedGroup.name}`
      let newActivity = boardService.getEmptyActivity(txt, this.miniUser)
      this.board.activities.push(newActivity)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.$notify({
        message: 'Group updated',
        position: 'bottom-left',
        duration: 2000
      })
      this.forceRerender()
    },
    updateGroups(groups) {
      this.board.groups = groups
      const txt = `${this.user.fullName} updated the groups`
      let newActivity = boardService.getEmptyActivity(txt, this.miniUser)
      this.board.activities.push(newActivity)
      this.$store.dispatch({
        type: 'saveBoard',
        board: this.board
      })
      this.$notify({
        message: 'Groups updated',
        position: 'bottom-left',
        duration: 2000
      })
      this.forceRerender()
    }
  },
  watch: {
    '$route.params.boardId'() {
      this.loadBoard()
      this.forceRerender()
    }
  },
  created() {
    this.$store.dispatch({
      type: 'createPrivateSocket'
    })
    this.$store.dispatch({ type: 'loadUsers' })
    this.loadBoards()
    this.loadBoard()
    eventBus.$on('updateGroup', this.updateGroup)
    eventBus.$on('forceRerender', this.forceRerender)
  },
  destroyed() {},
  components: {
    groupList,
    boardList,
    boardSearch,
    chatApp,
    boardHeader,
    trelloMode
  }
}
</script>