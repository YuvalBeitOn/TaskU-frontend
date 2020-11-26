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
    </section>
</template>

<script>
import groupList from '@/cmps/group-list'
import boardList from '@/cmps/board-list.vue'
import { boardService } from '@/services/board.service'
// import boardFilter from '@/cmps/board-filter.vue'

export default {
    name: 'board-app',
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
        watch: {
            '$route.params.boardId'() {
                this.loadBoard()
            },
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
    },
    watch: {
        '$route.params.boardId'() {
            this.loadBoard()
        },
    },
    created() {
        this.$store.dispatch({ type: 'loadBoards' })
        this.loadBoard()
    },
    components: {
        groupList,
        boardList,
        // boardFilter
    },
}
</script>
