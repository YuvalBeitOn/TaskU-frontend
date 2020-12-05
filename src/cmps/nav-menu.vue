<template>
    <nav class="nav-menu flex column space-between relative">
        <div class="top-nav">
            <div class="nav-logo">
                <router-link class="nav-link flex justify-center" to="/">
                    <img src="img/icons/logo_icon.png" alt="TaskU" />
                </router-link>
            </div>
            <div
                class="nav-icon-container notifs"
                v-tooltip.right="'Notfications'"
            >
                <i class="nav-icon far fa-bell" @click="toggleNotifsModal"></i>
                <notifications-modal v-if="isNotifsModalShown" />
            </div>
            <div class="nav-icon-container" v-tooltip.right="'Inbox'">
                <i class="nav-icon far fa-inbox-in"></i>
            </div>
        </div>

        <div class="user-greeting" v-if="user">Hello {{ user.fullName }}</div>
        <div class="bottom-nav">
            <div class="nav-icon-container" v-tooltip.right="'Calender'">
                <router-link to="/calender">
                    <i class="nav-icon fal fa-calendar-check"></i>
                </router-link>
            </div>

            <div class="nav-icon-container" v-tooltip.right="'Logout'">
                <i
                    class="nav-icon logout fad fa-sign-out"
                    @click="onLogout"
                ></i>
            </div>
            <div
                class="user-profile"
                @click="toggleUserModal"
                v-if="user"
                v-tooltip.right="'Profile'"
            >
                <img
                    class="user-img"
                    src="https://cdn1.monday.com/dapulse_default_photo.png"
                    alt=""
                />
                <popup-menu
                    class="user-menu"
                    v-if="isUserModalShown"
                    :menuItems="popupOptions"
                />
            </div>
        </div>
        <div
            class="back-drop-layer"
            v-if="isUserModalShown"
            @click.stop="isUserModalShown = false"
        ></div>
    </nav>
</template>

<script>
import NotificationsModal from './notifications-modal.vue'
import popupMenu from './popup-menu.vue'
export default {
    components: { popupMenu, NotificationsModal },
    name: 'nav-menu',
    data() {
        return {
            isUserModalShown: false,
            isNotifsModalShown: false,
            popupOptions: [
                {
                    txt: 'My Profile',
                    func: this.goToUserProfile,
                    iconStr: 'user-circle',
                },
                {
                    txt: 'Log out',
                    func: this.logOut,
                    iconStr: 'sign-out',
                },
            ],
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    methods: {
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
                type: 'logout',
            })
            this.$router.push('/')
        },
    },
}
</script>
