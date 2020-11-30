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
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Password
                                <input
                                    v-model="loginCredentials.password"
                                    type="password"
                                />
                            </label>
                        </div>
                        <button class="submit-button">
                            Log in <i class="fa fa-arrow-right"></i>
                        </button>
                    </form>
                    <pre>{{ loginCredentials }}</pre>
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
            },
        }
    },
    created() {},
    methods: {
        submitLogin() {
            alert('submitted');
        },
    },
}
</script>
