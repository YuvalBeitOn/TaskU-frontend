<template>
    <div id="app">
        <main class="board-container flex">
            <nav-menu v-if="isNavShowen" />
            <router-view />
        </main>
    </div>
</template>


<script>
import navMenu from "@/cmps/nav-menu";
export default {
    methods: {},
    computed: {
        isNavShowen() {
            return this.$route.path === "/login" ||
                this.$route.path === "/signup" ||
                this.$route.path === "/"
                ? false
                : true;
        },
    },
    created() {},
    components: {
        navMenu,
    },
};
</script>



