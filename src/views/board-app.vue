<template>
    <section v-if="board" class="board-app flex">
        <board-list
            :expandList="expandList"
            :isExpanded="isListExpanded"
            @removeBoard="removeCurrBoard"
            @addNewBoard="addBoard"
            :boards="boards"
            title="Boards"
        >
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

        <div class="board-app-container width100">
            <board-header
                :updateBoardName="updateBoardName"
                :updateBoardDesc="updateBoardDesc"
                :board="board"
                :addGroup="addGroup"
                @removeMember="removeBoardMember"
                @addMember="addBoardMember"
                :forceRerender="forceRerender"
            />
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
        </div>
        <div v-if="isTaskDetailsHover" class="backdrop-layer"></div>

        <!-- <task-details
      v-if="this.$route.params.taskId"
      @close="isTaskDetailsHover = false"
      @mouseover.native="isTaskDetailsHover = true"
      @mouseleave.native="isTaskDetailsHover = false"
    /> -->
        <router-view class="grow" />

        <div
            v-tooltip.top="'Chat Board'"
            v-show="isChatingBtnShown"
            class="chat-icon-btn-container flex align-center justify-center"
        >
            <i @click="toggleChat" class="fas chat-icon fa-comments"></i>
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
// import taskDetails from '../views/task-details'
import { boardService } from '@/services/board.service'
import boardSearch from '@/cmps/board-search'
import { utilService } from '@/services/util.service'
import boardHeader from '../cmps/board-header.vue'
import { socketService } from '@/services/socket.service.js'

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
            componentKey: 0,
        }
    },
    computed: {
        // NOT  REMOVE THIS FUNC !!!!!!!!!!
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
        board() {
            return this.$store.getters.board
        },
        boards() {
            return this.$store.getters.boards
        },
    },
    methods: {
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
            const txt = `${this.user.fullName} duplicated group the group ${group.txt} `
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.$store.dispatch({ type: 'updateBoard', board: this.board })
        },

        updateBoardName(ev) {
            ev.target.blur()
            if (ev.target.innerText === this.board.name) return
            else {
                this.board.name = ev.target.innerText
                const txt = `${this.user.fullName} update Board name`
                let newActivity = boardService.getEmptyActivity(txt, this.user)
                this.board.activities.push(newActivity)
                this.$store.dispatch({ type: 'saveBoard', board: this.board })
                this.$store.dispatch({ type: 'updateBoard', board: this.board })
                this.$notify({
                    message: 'Board name updated',
                    position: 'bottom-left',
                    duration: 2000,
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
                let newActivity = boardService.getEmptyActivity(txt, this.user)
                this.board.activities.push(newActivity)
                this.$store.dispatch({ type: 'saveBoard', board: this.board })
                this.$store.dispatch({ type: 'updateBoard', board: this.board })
                this.$notify({
                    message: 'Board description updated',
                    position: 'bottom-left',
                    duration: 2000,
                })
                this.forceRerender()
            }
        },
        forceRerender() {
            this.componentKey += 1
        },
        addBoardMember(user) {
            console.log('user:', user)
            this.board.members.unshift(user)
            const txt = `${this.user.fullName} add ${user.fullName} to Board`
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.$store.dispatch({ type: 'updateBoard', board: this.board })
            this.$notify({
                message: 'New member added to board',
                position: 'bottom-left',
                duration: 2000,
            })
        },
        removeBoardMember(member) {
            const idx = this.board.members.findIndex(
                (bMember) => bMember._id === member._id
            )
            this.board.members.splice(idx, 1)
            const txt = `${this.user.fullName} remove  ${member.fullName} from Board`
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.$store.dispatch({ type: 'updateBoard', board: this.board })
            this.$notify({
                message: 'Member removed from board',
                position: 'bottom-left',
                duration: 2000,
            })
        },
        setSearch(searchBoard) {
            this.$store.commit({ type: 'setSearch', searchBoard })
            this.$store.dispatch({ type: 'loadBoards' })
        },
        removeCurrBoard(boardId) {
            const txt = `${this.user.fullName} remove Board`
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({ type: 'removeBoard', boardId })
            this.$store.dispatch({ type: 'loadAllBoards' })
            this.$notify({
                message: 'Board deleted',
                position: 'bottom-left',
                duration: 2000,
            })
        },
        async loadBoards() {
            await this.$store.dispatch({ type: 'loadBoards' })
            this.forceRerender()
        },
        addBoard() {
            this.$prompt('Please enter a name to your board', 'Add New Board', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
            })
                .then(({ value }) => {
                    const board = boardService.getEmptyBoard()
                    board.name = value
                    board.creator = this.user
                    board.members.push(this.user)
                    const txt = `${this.user.fullName} create this Board`
                    let newActivity = boardService.getEmptyActivity(
                        txt,
                        this.user
                    )
                    this.board.activities.push(newActivity)
                    this.$store.dispatch({ type: 'saveBoard', board })
                    this.$store.dispatch({ type: 'loadAllBoards' })
                    this.$message({
                        type: 'success',
                        message: 'Your Board:' + value + ' add ',
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Your action  canceled',
                    })
                })
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
            const txt = `${this.user.fullName} has added a new group!`
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
            this.$store.dispatch({ type: 'updateBoard', board: this.board })
            this.$notify({
                message: 'New group added',
                position: 'bottom-left',
                duration: 2000,
            })
            this.forceRerender()
        },
        deleteGroup(groupId) {
            const idx = this.board.groups.findIndex(
                (group) => group.id === groupId
            )
            const txt = `${this.user.fullName} deleted group ${this.board.groups[idx].txt}`
            this.board.groups.splice(idx, 1)
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
            this.$store.dispatch({ type: 'updateBoard', board: this.board })
            this.$notify({
                message: 'Group deleted',
                position: 'bottom-left',
                duration: 2000,
            })
            this.forceRerender()
        },
        updateGroup(updatedGroup) {
            const idx = this.board.groups.findIndex(
                (group) => group.id === updatedGroup.id
            )
            this.board.groups.splice(idx, 1, updatedGroup)
            const txt = `${this.user.fullName} updated group ${updatedGroup.txt}`
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
            this.$store.dispatch({ type: 'updateBoard', board: this.board })
            this.$notify({
                message: 'Group updated',
                position: 'bottom-left',
                duration: 2000,
            })
            this.forceRerender()
        },
        updateBoardActivity(activity) {
            this.board.activities.unshift(activity)
            console.log('this.board.activities:', this.board.activities)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
            this.$store.dispatch({ type: 'updateBoard', board: this.board })
        },
        updateGroups(groups) {
            this.board.groups = groups
            const txt = `${this.user.fullName} updated the groups`
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
            this.$store.dispatch({ type: 'updateBoard', board: this.board })
            this.$notify({
                message: 'Groups updated',
                position: 'bottom-left',
                duration: 2000,
            })
            this.forceRerender()
        },
    },
    watch: {
        '$route.params.boardId'() {
            this.loadBoard()
            this.forceRerender()
        },
    },
    async created() {
        console.log('boardapp creation')
        socketService.on('updated board', (board) => {
            this.$store.commit({
                type: 'setBoard',
                board,
            })
            this.forceRerender()
        })
        socketService.on('load boards', () => {
            console.log('im here hunny')
            this.loadBoards()
        })
        eventBus.$on('updateBoardActivity', this.updateBoardActivity)
        this.$store.dispatch({ type: 'loadUsers' })
        this.loadBoards()
        this.loadBoard()
    },
    destroyed() {
        this.$store.dispatch({ type: 'turnOffSocket' })
    },
    components: {
        groupList,
        boardList,
        // taskDetails,
        boardSearch,
        chatApp,
        boardHeader,
    },
}
</script>
