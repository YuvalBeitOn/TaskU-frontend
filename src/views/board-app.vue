<template>
    <section class="board-app flex">
        <board-list
            @searchBoard="setSearch"
            @removeBoard="removeCurrBoard"
            @addNewBoard="addBoard"
            :boards="boards"
        />
        <div>
            <div v-if="board" class="board-control">
                <h2>{{ board.name }}</h2>
                <!-- <board-filter /> -->
                <!-- <button @click="addGroup">New Group</button> -->
            </div>
            <group-list
                v-if="board"
                :groups="board.groups"
                :boardName="board.name"
            />
        </div>
        <task-details v-if="this.$route.params.taskId" :task="currTask" />
    </section>
</template>

<script>
import taskDetails from '../views/task-details'
import groupList from '@/cmps/group-list'
import boardList from '@/cmps/board-list.vue'
import { boardService } from '@/services/board.service'
import { eventBus } from '@/services/event-bus.service'

// import boardFilter from '@/cmps/board-filter.vue'

export default {
    name: 'board-app',
    data() {
        return {
            currTask: null,
        }
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
        boards() {
            return this.$store.getters.boards
        },
    },
    methods: {
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
        setCurrTask(task) {
            this.currTask = task
        },
    },
    watch: {
        '$route.params.boardId'() {
            this.loadBoard()
        },
    },
    created() {
        eventBus.$on('taskDetails', this.setCurrTask)
        this.$store.dispatch({ type: 'loadBoards' })
        this.loadBoard()
    },
    components: {
        groupList,
        boardList,
        taskDetails,
        // boardFilter
    },
}
</script>
