<template>
    <section class="home-page page-dark">
        <div class="nav-container flex wrap align-center space-between">
            <div class="container-nav">

            <div class="app-logo">
                <img
                    class="logo1 flex end"
                    src="@/assets/imgs/logo1.png"
                    alt=""
                />
            </div>
            <nav class="nav-home-page flex space-between align-center">
                <router-link to="/">home</router-link>
                <router-link v-if="!loggedInUser" to="/login"
                    >login</router-link
                >
                <router-link v-if="!loggedInUser" to="/signup"
                    >sign up</router-link
                >
                <span v-if="loggedInUser" @click="onLogout">logout</span>
                <button @click="onGetStarted" class="btn-app btn-nav">
                    Get Started
                </button>
            </nav>
            </div>

        </div>

        <main class="main-content top-hero relative">
            <section class="hero-homepage hero-container ">
                
                <div class="main-hero-contant flex space-between ">
                    <div class="content-container flex column wrap tracking-in-expand">
                        <h1 class="title-hero ">Work the way that works for you</h1>
                        <p>
                         Highly effective teams choose TaskU - Work OS for better collaboration, organization, and efficiency in all their work.

                        </p>
                        <button @click="onGetStarted" class="btn-app main-btn">
                            {{ enteryButton }}
                        </button>
                    </div>
                    <div class="img-hero">
                        <img
                        src="@/assets/imgs/svg/bgc-2-preson.svg"
                          
                            class="img-home-page"
                            alt=""
                            srcset=""
                        />
                    </div>

                </div>
               
            </section>
                
        </main>
              <img
                             src="@/assets/imgs/svg/bgc-person-task.svg"
                            class="img-right"
                            alt=""
                            
                         />
                          <img
                            src="@/assets/imgs/svg/3-pepole.svg"
                            class="img-second-section"
                            alt=""
                            
                         />
                           <!-- <section class="second-section">
                               <div
                                class="flex  space-around">
 <img
                            src="@/assets/imgs/svg/3-pepole.svg"
                            class="img-second-section"
                            alt=""
                            
                         />
                         <div class="card-container">
                             <h2>A work team like never before</h2>
                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, doloremque, vel, perferendis repudiandae voluptate corporis similique cum sequi est delectus veritatis. Quia eos ex laudantium excepturi dolore nesciunt, nobis laboriosam.</p>
                         </div>
                               </div>
       
    </section> -->
    <!-- <img
                            src="@/assets/imgs/svg/bgc-bottom.svg"
                            class="img-bottom"
                            alt=""
                            
                         /> -->
    </section>
  
</template>

<script>
export default {
    name: 'home-page',
    computed: {
        firstBoardId() {
            return this.$store.getters.defaultBoardId
        },
        loggedInUser() {
            return this.$store.getters.user
        },
        enteryButton() {
            return this.loggedInUser ? 'Enter Workspace' : 'Try as a guest'
        },
    },
    methods: {
        async onGetStarted() {
            if (this.loggedInUser) {
                this.$router.push('/board/' + this.firstBoardId)
            } else {
                await this.$store.dispatch({
                    type: 'login',
                    userCred: 'guest',
                })
                await this.$store.dispatch({ type: 'loadBoards' })
                this.$router.push(`board/${this.firstBoardId}`)
            }
        },
        onLogout() {
            console.log('Logging out')
            this.$store.dispatch({
                type: 'logout',
            })
        },
    },
    created() {
        if (this.loggedInUser) {
            this.$store.dispatch({ type: 'loadBoards' })
        }
    },
}
</script>
