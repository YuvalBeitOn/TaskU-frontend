<template>
    <div id="app">
        <main class="board-container flex">
            <template v-if="isNavShowen">
                <nav-menu />
                <board-list />
            </template>
            <router-view />
        </main>
    </div>
</template>


<script>
import navMenu from "@/cmps/nav-menu";
import boardList from "@/cmps/board-list.vue";

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
        boardList,
    },
};
</script>


 
