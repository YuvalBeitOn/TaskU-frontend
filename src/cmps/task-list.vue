<template>
    <section v-if="tasks" class="task-list width100">
        <ul class="clean-list flex wrap align-center justify-center gap">
            <task-preview
                v-for="task in tasks"
                :key="task.id"
                :task="task"
            />
        </ul>
    </section>
</template>


<script>
import taskPreview from "@/cmps/task-preview.vue";

export default {
    name: "task-list",
    props: {
        tasks: Array,
    },
    methods: {
    },
    components: {
        taskPreview,
    },
};
</script>
