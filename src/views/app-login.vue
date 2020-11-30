<template>
    <section class="app-login flex column">
        <div class="login-header flex">TaskU LOGO</div>
        <div class="page-content flex align-center justify-center">
            <div class="login-box w100 flex column align-center">
                <h1 class="login-title">
                    Log <span class="thin-fonted">In</span>
                </h1>
                <div class="login-options-wrapper flex column">
                    <form @submit.prevent="submitLogin">
                        <div>
                            <label>
                                Email
                                <input
                                    v-model="loginCredentials.email"
                                    type="text"
                                    autocomplete="email"
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Password
                                <input
                                    v-model="loginCredentials.password"
                                    type="password"
                                    autocomplete="password"
                                />
                            </label>
                        </div>
                        <button class="submit-button">
                            Log in <i class="fa fa-arrow-right"></i>
                        </button>
                    </form>
                    <span>New to our website? <router-link to="/signup">Let's sign-up!</router-link></span>
                </div>
            </div>
        </div>
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
    created() {},
    methods: {
        async submitLogin() {
            const userCred = JSON.parse(JSON.stringify(this.loginCredentials))
            this.$store.dispatch({
                type: 'login',
                userCred,
            })
            this.loginCredentials = {
                email: null,
                password: null,
                isAdmin: false,
            }
            this.$router.push('/board')
        },
    },
}
</script>
