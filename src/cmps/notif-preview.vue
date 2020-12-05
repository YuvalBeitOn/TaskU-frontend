<template>
  <li
    @mouseover="showBtns"
    @mouseleave="hideBtns"
    class="notif-preview flex align center space-between"
  >
    <div class="notif-container flex align-center">
      <avatar class="user-img" :user="user" :size="50" />
      <div class="notif-details flex column">
        <span class="user-mail">{{ notif.byUser.mail }}</span>
        <span class="notif-txt">{{ notif.txt }}</span>
        <div class="notif-footer flex align-center">
          <small class="notif-date">{{ dateForDisplay }} </small>
          <span class="point"></span>
          <small class="notif-board-name">{{ board.name }}</small>
        </div>
      </div>
    </div>
    <div
      v-if="isHovering"
      class="notif-btns flex column space-between align-center"
    >
      <button class="notif-btn" @click="deleteNotif">
        <i class="far fa-trash-alt"></i>
      </button>
      <button class="notif-btn" @click="toggleIsRead">
        <i :class="isRead"></i>
      </button>
    </div>
  </li>
</template>

<script>
import moment from 'moment'
import Avatar from '@/cmps/user-avatar.vue'

export default {
  props: {
    notif: Object,
    user: Object,
    board: Object
  },
  components: {
    Avatar
  },
  data() {
    return {
      notifCopy: null,
      isHovering: false
    }
  },
  computed: {
    dateForDisplay() {
      return moment(this.notif.createdAt)
        .startOf('day')
        .fromNow()
    },
    isRead() {
      return this.notif.isRead ? 'fas fa-check-circle' : 'far fa-circle'
    }
  },
  methods: {
    showBtns() {
      this.isHovering = true;
    },
    hideBtns() {
      this.isHovering = false;
    },
    deleteNotif() {
      this.$emit('deleteNotif', this.notifCopy)
    },
    toggleIsRead() {
      this.notifCopy.isRead = !this.notifCopy.isRead
      this.$emit('updateNotif', this.notifCopy)
    }
  },
  created() {
    this.notifCopy = this.notif
  }
}
</script>
