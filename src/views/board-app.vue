<template>
    <section v-if="!isLoading" class="board-app flex">
        <board-list
            :isExpanded="isListExpanded"
            @removeBoard="removeCurrBoard"
            @addNewBoard="addBoard"
            :boards="boards"
            title="Boards"
        >
            <button
                slot="expand-btn"
                @click="toggleExpandList"
                @mouseover="expandList"
                :style="expendStyle"
                :class="{
                    'expand-list-btn': true,
                    notExpanded: !isListExpanded,
                }"
            >
                <i
                    v-tooltip.right="'Expend/Hide List'"
                    :class="expendBtnStyle"
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

        <task-details
            v-if="this.$route.params.taskId"
            @close="isTaskDetailsHover = false"
            @mouseover.native="isTaskDetailsHover = true"
            @mouseleave.native="isTaskDetailsHover = false"
        />
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
// import addMembers from '@/cmps/add-members'
import groupList from '@/cmps/group-list'
import boardList from '@/cmps/board-list.vue'
import taskDetails from '../views/task-details'
import { boardService } from '@/services/board.service'
// import boardFilter from '@/cmps/board-filter.vue'
import boardSearch from '@/cmps/board-search'
import { utilService } from '@/services/util.service'
import boardHeader from '../cmps/board-header.vue'

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
        chatControl() {
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
            this.$notify({
                message: 'Duplicated group was added',
                position: 'bottom-left',
                duration: 2000,
            })
            this.forceRerender()
        },

        updateBoardName(ev) {
            this.board.name = ev.target.innerText
            const txt = `${this.user.fullName} update Board name`
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)

            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.$notify({
                message: 'Board name updated ',
                position: 'bottom-left',
                duration: 2000,
            })
            this.forceRerender()
        },
        updateBoardDesc(ev) {
            this.board.description = ev.target.innerText
            const txt = `${this.user.fullName} update Board description`
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.$notify({
                message: 'Board description updeated',
                position: 'bottom-left',
                duration: 2000,
            })
            this.forceRerender()
        },
        forceRerender() {
            this.componentKey += 1
        },
        addBoardMember(user) {
            console.log('user:', user)
            this.board.members.unshift(user)
            const txt = `${this.user.fullName} add ${user.fullName}  to board`
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.$notify({
                message: 'Add new member to board',
                position: 'bottom-left',
                duration: 2000,
            })
        },
        removeBoardMember(userId) {
            const idx = this.board.members.findIndex(
                (bMember) => bMember._id === userId
            )
            this.board.members.splice(idx, 1)
            const txt = `${this.user.fullName} remove  group`
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({ type: 'saveBoard', board: this.board })
            this.$notify({
                message: 'The member has been removed from the board',
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
            this.$notify({
                message: 'The board has been deleted',
                position: 'bottom-left',
                duration: 2000,
            })
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
                    this.$store.dispatch({ type: 'saveBoard', board })
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
            this.$notify({
                message: 'A new group was added',
                position: 'bottom-left',
                duration: 2000,
            })
            this.forceRerender()
        },
        deleteGroup(groupId) {
            const idx = this.board.groups.findIndex(
                (group) => group.id === groupId
            )
            this.board.groups.splice(idx, 1)
            const txt = `${this.user.fullName} deleted group`
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
            this.$notify({
                message: 'The group has been deleted',
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
            const txt = `${this.user.fullName} updated  group`
            let newActivity = boardService.getEmptyActivity(txt, this.user)
            this.board.activities.push(newActivity)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
            this.$notify({
                message: 'Group has been updated',
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
            this.$notify({
                message: 'The Groups has been saved',
                position: 'bottom-left',
                duration: 2000,
            })
            this.forceRerender()
        },
    },
    watch: {
        '$route.params.boardId'(val) {
            if (val) {
                this.loadBoard()
                this.forceRerender()
            }
        },
    },
    created() {
        eventBus.$on('addMember', this.addBoardMember)
        eventBus.$on('removeMember', this.removeBoardMember)
        eventBus.$on('updateBoardActivity', this.updateBoardActivity)
        this.$store.dispatch({ type: 'loadUsers' })
        this.$store.dispatch({ type: 'loadUser', userId: '301' })
        this.$store.dispatch({ type: 'loadBoards' })
        this.loadBoard()
    },
    components: {
        groupList,
        boardList,
        // boardFilter,
        // addMembers,
        taskDetails,
        boardSearch,
        chatApp,
        boardHeader,
    },
}
</script>
