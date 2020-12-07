<template>
  <nav class="nav-menu relative">
    <div class="top-nav">
      <div class="nav-logo">
        <router-link
          v-if="boards && boards.length"
          class="nav-link flex justify-center"
          :to="'/board/' + defaultBoardId"
        >
          <img src="img/icons/logo_icon.png" alt="TaskU" />
        </router-link>
      </div>
      <div class="nav-icon-container notifs" v-tooltip.right="'Notfications'">
        <i class="nav-icon far fa-bell" @click="toggleNotifsModal"></i>
        <span class="notif-amount" v-if="numOfNotifs">{{ numOfNotifs }}</span>
        <notifications-modal v-if="isNotifsModalShown" />
      </div>
      <div class="nav-icon-container inbox" v-tooltip.right="'Inbox'">
        <i class="nav-icon far fa-inbox-in"></i>
      </div>
    </div>
    <div class="user-greeting" v-if="user">
      <span class="inner-text">Hello {{ userFullName }}</span>
    </div>
    <div class="bottom-nav">
      <div class="nav-icon-container" v-tooltip.right="'Calendar'">
        <router-link to="/calendar">
          <i class="nav-icon fal fa-calendar-check"></i>
        </router-link>
      </div>

      <div class="nav-icon-container" v-tooltip.right="'Logout'">
        <i class="nav-icon logout fad fa-sign-out" @click="onLogout"></i>
      </div>
      <div
        class="user-profile"
        @click="toggleUserModal"
        v-if="user"
        v-tooltip.right="'Profile'"
      >
        <avatar class="user-img-nav" :user="user" />

        <popup-menu
          class="user-menu"
          v-if="isUserModalShown"
          :menuItems="popupOptions"
        />
      </div>
    </div>
    <div
      class="back-drop-layer"
      v-if="isUserModalShown || isNotifsModalShown"
      @click.stop="closePopUps"
    ></div>
  </nav>
</template>

<script>
import NotificationsModal from './notifications-modal.vue'
import popupMenu from './popup-menu.vue'
import Avatar from './user-avatar'
export default {
  components: { popupMenu, NotificationsModal, Avatar },
  name: 'nav-menu',
  data() {
    return {
      isUserModalShown: false,
      isNotifsModalShown: false,
      darkMode: false,
      popupOptions: [
        {
          txt: 'My Profile',
          func: this.goToUserProfile,
          iconStr: 'user-circle'
        },
        {
          txt: 'Log out',
          func: this.logOut,
          iconStr: 'sign-out'
        },
        {
          txt: 'Dark mode',
          func: this.darkModeToggle,
          iconStr: 'adjust'
        }
      ]
    }
  },
  computed: {
    userFullName() {
      const userFullName = this.user.fullName
      const spaceIdx = userFullName.indexOf(' ')
      return spaceIdx < 0 ? userFullName : userFullName.substr(0, spaceIdx)
    },
    numOfNotifs() {
      return this.$store.getters.user.notifications.length
    },
    user() {
      return this.$store.getters.user
    },
    defaultBoardId() {
      return this.$store.getters.defaultBoardId
    },
    boards() {
      return this.$store.getters.boards
    }
  },
  methods: {
    closePopUps() {
      this.isUserModalShown = false
      this.isNotifsModalShown = false
    },
    darkModeToggle() {
      this.darkMode = !this.darkMode
      this.$store.commit({ type: 'darkMode', darkMode: this.darkMode })
    },
    toggleNotifsModal() {
      this.isNotifsModalShown = !this.isNotifsModalShown
    },

    goToUserProfile() {
      if (this.user) this.$router.push(`/user/${this.user._id}`)
      else this.$router.push('/signup')
      this.isUserModalShown = false
    },
    logOut() {
      this.$emit('logout')
    },
    toggleUserModal() {
      this.isUserModalShown = !this.isUserModalShown
    },
    onLogout() {
      console.log('logging out')
      this.$store.dispatch({
        type: 'logout'
      })
      this.$router.push('/')
    }
  },
  created(){
      console.log('im created~!!')
      console.log(this.boards.length)
    if(this.boards.length===0) {
      console.log('im created~2!!')
  this.$store.dispatch({type: 'loadBoards'})}
}

}
</script>
