<template>
    <li class="group-preview">
        <h2>Group: {{group.id}}</h2>
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

