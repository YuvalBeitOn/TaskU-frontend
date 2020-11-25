<template>
    <li class="group-preview">
       <task-list :tasks="group.tasks"/>
    </li>
</template>

<script>
import taskList from './task-list.vue';
export default {
    name: "group-preview",
    props: {
        group: Object,
    },
    components: { taskList },
};
</script>

