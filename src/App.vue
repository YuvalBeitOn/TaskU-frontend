<template>
    <div id="app">
        <nav-menu v-if="isNavShowen" />
        <router-view />
    </div>
</template>


<script>
import navMenu from "@/cmps/nav-menu";
export default {
    methods: {},
    computed: {
      isNavShowen(){
        return (this.$route.path === ('/login') || this.$route.path === ('/signup') || this.$route.path === ('/'))? false : true 
      }
    },
    created() {},
    components: {
        navMenu,
    },
};
</script>



