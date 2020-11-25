<template>
    <section class="board-list flex column">
        <div class="top-bar">
            <h1 class="top-line flex space-between">
                Boards <span @click="addBoard"><i class="fas fa-plus-octagon"></i></span>
            </h1>
        </div>
            <input class="board-list-search"
                type="text"
                @input="emitSearch"
                v-model="searchBoard"
                placeholder="Search"
            />

        <ul v-if="boards" class="boards-list clean-list">
            <li class="board-item" v-for="board in boards" :key="board._id">
<i @click="removeCurrBoard(board._id)" class="board-list-icon fal fa-trash"></i>
                <router-link :to="'/board/' + board._id">{{
                    board.name
                }}</router-link>
            </li>
        </ul>
    </section>
</template>

<script>
import lodash from 'lodash'

export default {
    name: 'board-list',
    props: {
        boards: [Array, Object],
    },
    data() {
        return {
            searchBoard: '',
        }
    },
    computed: {},
    methods: {
        emitSearch() {
            const searchBoard = JSON.parse(JSON.stringify(this.searchBoard))
            this.$emit('searchBoard', searchBoard)
        },
        removeCurrBoard(boardId) {
            this.$emit('removeBoard', boardId)
        },
        addBoard() {
            this.$emit('addNewBoard')
        },
    },
    created() {
        this.emitSearch = lodash.debounce(this.emitSearch, 500)
    },
}
</script>
