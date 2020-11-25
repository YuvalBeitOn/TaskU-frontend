<template>
    <section class="board-app">
<<<<<<< HEAD
        {{ board }}
=======
>>>>>>> b8acdcbf2df3eeab7289a7f5228969bc3afc68fd
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
<<<<<<< HEAD
        this.$store.dispatch({
            type: "loadBoard",
            boardId: this.$route.params.boardId,
        });
=======
        this.loadBoard();
>>>>>>> b8acdcbf2df3eeab7289a7f5228969bc3afc68fd
    },
    components: {
        groupList,
    },
};
</script>

