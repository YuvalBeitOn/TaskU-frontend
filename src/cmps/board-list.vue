<template>
    <section class="board-list flex column">
        <div class="top-bar flex space-around align-center">
            <h1 class="title-board-list">Boards</h1>
            <i @click="addBoard" class="btn-add fas fa-plus-circle"></i>
        </div>
        <input
            class="board-list-search"
            type="text"
            @input="emitSearch"
            v-model="searchBoard"
            placeholder="Search"
        />

        <ul v-if="boards" class="boards-list clean-list">
            <li class="board-item" v-for="board in boards" :key="board._id">
                <!-- <i @click="removeCurrBoard(board._id)" class="trash-icon fas fa-trash"></i> -->
                <i
                    @click="togglePopup(board._id)"
                    class="minimenu-icon fas fa-ellipsis-h"
                ></i>
                <router-link :to="'/board/' + board._id">{{
                    board.name
                }}</router-link>
                <popupMenu
                    v-if="isPopupShowen && currBoardId === board._id"
                    :menuItems="popupOptions"
                    @closePopup="togglePopup"
                />
            </li>
        </ul>
    </section>
</template>

<script>
import lodash from 'lodash'
import popupMenu from '../cmps/popup-menu'
export default {
    name: 'board-list',
    props: {
        boards: [Array, Object],
    },
    data() {
        return {
            searchBoard: '',
            isPopupShowen: false,
            popupOptions: [
                {
                    txt: 'Delete this board',
                    func: this.removeCurrBoard,
                    iconStr: 'trash',
                },
            ],
            currBoardId: null,
        }
    },
    computed: {},
    methods: {
        emitSearch() {
            const searchBoard = JSON.parse(JSON.stringify(this.searchBoard))
            this.$emit('searchBoard', searchBoard)
        },
        removeCurrBoard() {
            console.log('boardId:', this.currBoardId)
            this.$emit('removeBoard', this.currBoardId)
        },
        addBoard() {
            this.$emit('addNewBoard')
        },
        togglePopup(boardId) {
            this.currBoardId = this.isPopupShowen ? '' : boardId
            this.isPopupShowen = !this.isPopupShowen
        },
    },
    created() {
        this.emitSearch = lodash.debounce(this.emitSearch, 500)
    },
    components: {
        popupMenu,
    },
}
</script>
