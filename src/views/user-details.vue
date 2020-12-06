<template>
    <section
        v-if="loggedInUser && user "
        class="user-details flex column"
    >
        <section
            class="header-user-profile flex column justify-center align-center"
        >
            <div class="img-profile-container flex align-center">
                <avatar :user="user" :size="120" className="img-profile" />
            </div>

            <h3 class="mail">{{ user.email }}</h3>
        </section>
        <el-tabs>
            <el-tab-pane label="User Details">
                <about-user :user="user" />
            </el-tab-pane>
            <el-tab-pane v-if="userLogin" label="Edit Profile">
                <edit-user @loadUser="setLogingUser"  v-if="userLogin" :user="user" />
            </el-tab-pane>
        </el-tabs>
    </section>
    <div v-else class="flex justify-center align-center">
        <img src="@/assets/imgs/loader.gif" class="loader-app" />
    </div>
</template>

<script>
import aboutUser from '@/cmps/user-details-about-user'
import editUser from '@/cmps/user-details-editor'
import Avatar from '@/cmps/user-avatar.vue'

export default {
    name: 'user-details',
    data() {
        return {
            user: null,
        }
    },
    computed: {
        userLogin(){
        const { userId } = this.$route.params
           return (this.loggedInUser._id === userId)  ? true : false
        },
        isLoading() {
            return this.$store.getters.isLoading
        },
        loggedInUser() {
            return this.$store.getters.user
        },
        users() {
            return this.$store.getters.users
        },
  
    },
    methods: {
        getUserById(userId) {
            const user = this.users.find((user) => user._id === userId)
            return user
        },
        setLogingUser(){
        this.user = this.loggedInUser
        }
    },
    created() {
        const { userId } = this.$route.params
        if (!this.loggedInUser) {
            this.$router.push('/')
        } else if (this.loggedInUser._id === userId) {
            this.user = this.loggedInUser
        } else {
            const user = this.getUserById(userId)
            this.user = user
        }
    },
    components: {
        Avatar,
        aboutUser,
        editUser
    },
}
</script>
