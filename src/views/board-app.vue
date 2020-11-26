<template>
    <section v-if="board" class="board-app flex">
        <board-list
            @searchBoard="setSearch"
            @removeBoard="removeCurrBoard"
            @addNewBoard="addBoard"
            :boards="boards"
        />
        <group-list
            v-if="board"
            :groups="board.groups"
            :boardName="board.name"
        />
    </section>
</template>

<script>
import groupList from '@/cmps/group-list'
import boardList from '@/cmps/board-list.vue'
import { boardService } from '@/services/board.service'
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
        removeCurrBoard(boardId) {
            this.$store.dispatch({ type: 'removeBoard', boardId })
        },
        addBoard() {
            const board = boardService.getEmptyBoard()
            console.log('board:', board)
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
        console.log('BOARDAPP DEBUG: Created')
        this.$store.dispatch({ type: 'loadBoards' })
        this.loadBoard()
    },
    destroyed() {
        console.log('BOARDAPP DEBUG: Destroyed')
    },
    components: {
        groupList,
        boardList,
    },
}
</script>
