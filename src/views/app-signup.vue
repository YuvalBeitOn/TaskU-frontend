<template>
    <section class="app-login flex column">
        <div class="login-header flex">TaskU LOGO</div>
        <div class="page-content flex align-center justify-center">
            <div class="login-box w100 flex column align-center">
                <h1 class="login-title">
                    Sign <span class="thin-fonted">Up</span>
                </h1>
                <div class="login-options-wrapper flex column">
                    <form @submit.prevent="submitSignup">
                        <label>
                            Full name
                            <input
                                v-model="signupCredentials.fullName"
                                type="text"
                                autocomplete="new-fullname"
                            />
                        </label>
                        <label>
                            Email
                            <input
                                v-model="signupCredentials.email"
                                type="text"
                                autocomplete="new-email"
                            />
                        </label>
                        <label>
                            Password
                            <input
                                v-model="signupCredentials.password"
                                type="password"
                                autocomplete="new-password"
                            />
                        </label>
                        <button class="submit-button">
                            Sign Up <i class="fa fa-arrow-right"></i>
                        </button>
                    </form>
                    <span>Already signed up? <router-link to="/login">Let's log-in!</router-link></span>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
// To DO - Change it's template and css to a SIGNUP one, not login one. TEST ONLY
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
        }
    },
    computed: {},
    methods: {
        async submitSignup() {
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
            console.log(user)
            const board = boardService.getEmptyBoard()
            board.creator = user
            board.members.push(user)
            const boardId = await this.$store.dispatch({
                type: 'saveBoard',
                board
            })
            this.$router.push(`/board/${boardId}`)
        },
    },
}
</script>
