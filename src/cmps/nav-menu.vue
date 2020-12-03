<template>
    <section class="nav-menu flex column align-center space-between">
        <div class="top-nav flex column align-center">
            <div class="nav-logo">
                <router-link to="/">
                    <img src="img/icons/logo_icon.png" alt="TaskU" />
                </router-link>
            </div>
            <div class="nav-icon-container">
                <i
                    v-tooltip.right="'Notfications'"
                    class="nav-icon far fa-bell"
                ></i>
            </div>
            <div class="nav-icon-container">
                <i
                    v-tooltip.right="'Inbox'"
                    class="nav-icon far fa-inbox-in"
                ></i>
            </div>
        </div>

        <div class="user-greeting" v-if="user">Hello {{ user.fullName }}</div>
        <div class="bottom-nav flex column align-center">
            <div class="nav-icon-container">
                <i
                    v-tooltip.right="'Calender'"
                    class="nav-icon fal fa-calendar-check"
                ></i>
            </div>

            <div class="nav-icon-container">
                <i
                    @click="onLogout"
                    v-tooltip.right="'Logout'"
                    class="nav-icon logout fad fa-sign-out"
                ></i>
            </div>
            <router-link v-if="user" :to="'/user/' + user._id">
                <i
                    v-tooltip.right="'Profile'"
                    class="nav-icon profile fas fa-user-circle"
                ></i>
            </router-link>
        </div>
    </section>
</template>

<script>
export default {
    name: 'nav-menu',
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    methods: {
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
