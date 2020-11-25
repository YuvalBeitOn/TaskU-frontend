<template>
    <section class="board-app">
        <h1>This is board app page</h1>
        <group-list />
    </section>
</template>

<script>

import groupList from '@/cmps/group-list.vue';

export default {
    name: "board-app",
    components: {
        groupList
    },
};
</script>

