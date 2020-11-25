<template>
    <section class="board-app">
        {{ board }}
        <!-- <h1>This is board app page</h1> -->
        <group-list
            v-if="board"
            :groups="board.groups"
            :boardName="board.name"
        />
    </section>
</template>

<script>
import groupList from "@/cmps/group-list";
export default {
    name: "board-app",
    computed: {
        board() {
            return this.$store.getters.currBoard;
        },
    },
    created() {
        this.$store.dispatch({
            type: "loadBoard",
            boardId: this.$route.params.boardId,
        });
    },
    components: {
        groupList,
    },
};
</script>

