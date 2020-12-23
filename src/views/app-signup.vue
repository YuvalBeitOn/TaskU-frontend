<template>
    <section class="app-signup-container sign-up-container">
        <div class="signup-header login-header">
            <router-link to="/"
                ><img
                    class="logo2 flex end"
                    src="@/assets/imgs/logo2.png"
                    alt=""
            /></router-link>
        </div>
        <section class="app-signup flex column">
            <div class="login-form flex column justify-center">
                <h1 class="signup-title">
                    Sign <span class="thin-fonted">Up</span>
                </h1>
                <form
                    class="flex column justify-center align-center"
                    @submit.prevent="submitSignup"
                >
                    <el-input
                        type="text"
                        v-model="signupCredentials.fullName"
                        placeholder="Full Name"
                        required
                        :disabled="isElementDisabled"
                    />
                    <el-input
                        type="text"
                        v-model="signupCredentials.email"
                        placeholder="Email"
                        required
                        :disabled="isElementDisabled"
                    />

                    <el-input
                        type="password"
                        v-model="signupCredentials.password"
                        placeholder="Password"
                        required
                        :disabled="isElementDisabled"
                    />

                    <button class="signup-btn" :disabled="isElementDisabled">
                        Sign up
                    </button>
                </form>
                <div class="signup-section flex align-center">
                    <span class="separator-line"></span>
                    <div
                        class="signup-subtitle flex align-center justify-center"
                    >
                        Already have a user?
                        <router-link to="/login">
                            <span class="btn-content"> Login</span>
                        </router-link>
                    </div>
                    <span class="separator-line"></span>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { boardService } from '@/services/board.service'

export default {
    name: 'app-signup',
    data() {
        return {
            signupCredentials: {
                fullName: null,
                email: null,
                password: null,
                isAdmin: false,
            },
            isElementDisabled: false,
        }
    },
    computed: {},
    methods: {
        async submitSignup() {
            this.isElementDisabled = true
            const userCred = JSON.parse(JSON.stringify(this.signupCredentials))
            const user = await this.$store.dispatch({
                type: 'signup',
                userCred,
            })
            this.signupCredentials = {
                email: null,
                password: null,
                fullName: null,
                isAdmin: false,
            }
            const board = boardService.getEmptyBoard()
            let miniUser = JSON.parse(JSON.stringify(user))
            delete miniUser.isAdmin;
            delete miniUser.notifications;
            board.creator = miniUser
            board.members.push(miniUser)
            const boardId = await this.$store.dispatch({
                type: 'saveBoard',
                board,
            })
            this.$message({
                duration: 2000,
                showClose: true,
                type: 'success',
                offset: 335,
                message: "You've sucessfully signed up!",
            })
            setTimeout(() => {
                this.$router.push(`/board/${boardId}`)
            }, 2000)
        },
    },
}
</script>
<style >
</style>