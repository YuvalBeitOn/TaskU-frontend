<template>
    <section class="board-app">
        <!-- <h1>This is board app page</h1> -->
        <board-list />
        <group-list
            v-if="board"
            :groups="board.groups"
            :boardName="board.name"
        />
    </section>
</template>

<script>
import groupList from "@/cmps/group-list";
import boardList from "@/cmps/board-list.vue";

export default {
    name: "board-app",
    methods: {
        loadBoard() {
            this.$store.dispatch({
                type: "loadBoard",
                boardId: this.$route.params.boardId,
            });
        },
    },
    computed: {
        board() {
            return this.$store.getters.board;
        },
    },
    watch: {
        "$route.params.boardId"() {
            this.loadBoard();
        },
    },
    created() {
        this.loadBoard();
    },
    components: {
        groupList,
        boardList
    },
};
</script>

