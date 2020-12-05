<template>
    <section
        @mouseover="expandList"
        :class="{
            'board-list flex column relative': true,
            expanded: isExpanded,
        }"
    >
        <slot name="expand-btn"></slot>
        <h3 class="title-board-list">{{ title }}</h3>
        <div class="add-options flex align-center" @click="addBoard">
            <i
                class="fal fa-plus-circle add-icon"
                v-tooltip.top="'Add Board'"
            ></i>
            <span class="add-txt">Add</span>
        </div>
        <div>
            <slot name="search"></slot>
        </div>
        <span class="separator-line"></span>
        <ul v-if="boards" class="boards-list clean-list">
            <li class="board-item" v-for="board in boards" :key="board._id">
                <img class="board-img" src="@/assets/imgs/board.png" alt="" />
                <i
                    @click="togglePopup($event, board._id)"
                    class="minimenu-icon fas fa-ellipsis-h"
                ></i>
                <router-link class="item-txt" :to="'/board/' + board._id">{{
                    titleBoardToShow(board.name)
                }}</router-link>
            </li>
            <div
                class="back-drop-layer"
                v-if="isPopupShowen"
                @click="togglePopup"
            ></div>
        </ul>
        <popupMenu
            v-if="isPopupShowen"
            :menuItems="popupOptions"
            :offsetY="popupY"
            @closePopup="togglePopup"
        />
    </section>
</template>

<script>
import popupMenu from '../cmps/popup-menu'
export default {
    name: 'board-list',
    props: {
        boards: [Array, Object],
        title: String,
        isExpanded: Boolean,
        expandList: Function,
    },
    data() {
        return {
            isPopupShowen: false,
            popupOptions: [
                {
                    txt: 'Delete board',
                    func: this.removeCurrBoard,
                    iconStr: 'trash',
                },
            ],
            currBoardId: null,
        }
    },
    methods: {
        titleBoardToShow(title) {
            if (title.length > 10) {
                return title.substr(0, 8) + '..'
            } else {
                return title
            }
        },
        removeCurrBoard() {
            this.$emit('removeBoard', this.currBoardId)
        },
        addBoard() {
            this.$emit('addNewBoard')
        },

        togglePopup(ev, boardId) {
            this.popupY = ev.y
            this.currBoardId = this.isPopupShowen ? '' : boardId
            this.isPopupShowen = !this.isPopupShowen
        },
    },
    components: {
        popupMenu,
    },
}
</script>
