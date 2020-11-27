<template>
    <section class="board-app flex">
        <board-list
            @searchBoard="setSearch"
            @removeBoard="removeCurrBoard"
            @addNewBoard="addBoard"
            :boards="boards"
        />
        <div class="board-app-container width100">
            <div v-if="board" class="board-control">
                <h2>{{ board.name }}</h2>
                <board-filter
                    v-if="board.creator"
                    :creator="board.creator"
                    @addGroup="addGroup"
                />
                <!-- <button @click="addGroup">New Group</button> -->
                <i @click="toggleMembers" class="far fa-user-circle fa-icon"></i>
       <add-members v-if="isMembersShowen" firstTitle="Board Member" secondTitle="Users Site" :members="board.members" :allMembers="usersSite" @removeMember="removeUserFromBoard" @addMember="addUserToBoard"/>
            </div>
            <group-list
                v-if="board"
                :groups="board.groups"
                :boardName="board.name"
                @deleteGroup="deleteGroup"
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

export default {
    name: 'board-app',
    data() {
        return {
            isMembersShowen:false,
            currTaskDetails: null,
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
            return filteredSiteUsers
        },
    },
    methods: {
        toggleMembers(){
            this.isMembersShowen = !this.isMembersShowen
        },
        addUserToBoard(user) {
            console.log('user:', user)
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
            const idx = this.board.groups.findIndex(
                (group) => group.id === groupId
            )
            this.board.groups.splice(idx, 1)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
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
                (group) => group.id === taskDetails.groupId
            )
            const group = this.board.groups[groupIdx]
            const taskIdx = group.tasks.findIndex(
                (task) => task.id === newTask.id
            )
            group.tasks.splice(taskIdx, 1, newTask)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
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
    addMembers,
    taskDetails,
  }
}
</script>
