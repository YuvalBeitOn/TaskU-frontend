<template>
  <section class="board-list flex column">
    <div class="top-bar flex space-around align-center">
      <h1 class="title-board-list">{{ title }}</h1>
      <i @click="addBoard" class="btn-add fas fa-plus-circle"></i>
    </div>
    <slot name="search"></slot>

    <ul v-if="boards" class="boards-list clean-list">
      <li class="board-item" v-for="board in boards" :key="board._id">
        <i
          @click="togglePopup(board._id)"
          class="minimenu-icon fas fa-ellipsis-h"
        ></i>
        <router-link :to="'/board/' + board._id">{{ board.name }}</router-link>
        <popupMenu
          v-if="isPopupShowen && currBoardId === board._id"
          :menuItems="popupOptions"
          @closePopup="togglePopup"
        />
      </li>
      <div
        class="back-drop-layer"
        v-if="isPopupShowen"
        @click="togglePopup"
      ></div>
    </ul>
  </section>
</template>

<script>
import popupMenu from '../cmps/popup-menu'
export default {
  name: 'board-list',
  props: {
    boards: [Array, Object],
    title: String
  },
  data() {
    return {
      isPopupShowen: false,
      popupOptions: [
        {
          txt: 'Delete this board',
          func: this.removeCurrBoard,
          iconStr: 'trash'
        }
      ],
      currBoardId: null
    }
  },
  computed: {},
  methods: {
    removeCurrBoard() {
      console.log('boardId:', this.currBoardId)
      this.$emit('removeBoard', this.currBoardId)
    },
    addBoard() {
      this.$emit('addNewBoard')
    },togglePopup
    (boardId) {
      this.currBoardId = this.isPopupShowen ? '' : boardId
      this.isPopupShowen = !this.isPopupShowen
    }
  },
  created() {},
  components: {
    popupMenu
  }
}
</script>
