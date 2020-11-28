<template>
  <section v-if="user" class="user-details flex column">
    <section
      class="header-user-profile flex column justify-center align-center"
    >
      <div class="img-profile">
        <avatar
          class="profile-img"
          v-if="user"
          :username="user.fullName"
        ></avatar>
      </div>

      <h3 class="mail">{{ user.email }}</h3>
    </section>
    <div class="msg-user flex justify-center align-center">
    <h2>Hello,{{ user.fullName }}</h2>

    </div>
    <section class="user-content flex space-around align-center">
      <div class="user-details-info flex column wrap align-center">
        <h2>Details</h2>
        <h2><strong class="title-details">Full name:</strong>{{ user.fullName }}</h2>
        <h2><strong class="title-details">Email:</strong>{{ user.email }}</h2>
      </div>
      <div class="list-board flex column wrap clean-list align-center">
          <board-list
            @removeBoard="removeCurrBoard"
            @addNewBoard="addBoard"
            :boards="boards" title="Your Board"
            class="list-board"
         />
      </div>
      <div class="left-task">
        <p>You have  left 4 tasks to compolete</p>
      </div>
    </section>
  </section>
</template>

<script>
import Avatar from 'vue-avatar'
import boardList from '@/cmps/board-list'
import {boardService} from '@/services/board.service'
export default {
  name: 'user-details',

  computed: {
    user() {
      return this.$store.getters.loggedInUser
    },
    boards(){
      return this.$store.getters.boards
    }
  },
  methods:{
            removeCurrBoard(boardId) {
            this.$store.dispatch({ type: 'removeBoard', boardId })
        },
        addBoard() {
            const board = boardService.getEmptyBoard()
            this.$store.dispatch({ type: 'saveBoard', board })
        },
  },
  created() {
    const { userId } = this.$route.params
    this.$store.dispatch({ type: 'loadUser', userId })
  },
  components: {
    Avatar,
    boardList
  },
}
</script>
