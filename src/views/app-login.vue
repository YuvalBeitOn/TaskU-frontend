<template>
    <section class="app-login-container">
        <div class="login-header">
            <router-link to="/"
                ><img
                    class="logo2 flex end"
                    src="@/assets/imgs/logo2.png"
                    alt=""
            /></router-link>
        </div>
        <section class="app-login flex column">
            <div class="flex column justify-center">
                <h2 class="login-title">
                    Log <span class="thin-fonted">In</span>
                </h2>
                <form
                    class="flex column justify-center align-center"
                    @submit.prevent="submitLogin"
                >
                    <el-input
                        type="text"
                        v-model="loginCredentials.email"
                        placeholder="Email"
                        ref="emailInput"
                    />

                    <el-input
                        type="password"
                        v-model="loginCredentials.password"
                        placeholder="Password"
                        ref="passwordInput"
                    />

                    <button class="login-btn" ref="loginBtn">Login</button>
                </form>
                <div class="signup-section flex align-center">
                    <span class="separator-line"></span>
                    <div
                        class="login-subtitle flex align-center justify-center"
                    >
                        Don't have a user yet?

                        <router-link to="/signup">
                            <span class="btn-content"> Signup</span>
                        </router-link>
                    </div>
                    <span class="separator-line"></span>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    name: 'app-login',
    data() {
        return {
            loginCredentials: {
                email: null,
                password: null,
                isAdmin: false,
            },
        }
    },
    computed: {
        defaultBoardId() {
            return this.$store.getters.defaultBoardId
        },
    },
    created() {},
    methods: {
        async submitLogin() {
            const userCred = JSON.parse(JSON.stringify(this.loginCredentials))
            try {
                let user = await this.$store.dispatch({
                    type: 'login',
                    userCred,
                })
                if (user) {
                    this.$refs.loginBtn.disabled = true
                    this.$refs.emailInput.disabled = true
                    this.$refs.passwordInput.disabled = true
                    await this.$store.dispatch({ type: 'loadBoards' })
                    console.log('user after login:', user)
                    this.$message({
                        duration: 1000,
                        showClose: true,
                        type: 'success',
                        message: "You've sucessfully logged in!",
                    })
                    this.$router.push(`/board/${this.defaultBoardId}`)
                }
            } catch (err) {
                if (err.response.status === 401) {
                    this.$message({
                        durtion: 2000,
                        showClose: true,
                        type: 'error',
                        offset: 335,
                        message: 'Incorrect email or password.',
                    })
                }
            }
            // this.$store.dispatch({
            //   type: 'createPrivateSocket',
            //   userId: user._id
            // })
            this.loginCredentials = {
                email: null,
                password: null,
                isAdmin: false,
            }
        },
    },
}
</script>
