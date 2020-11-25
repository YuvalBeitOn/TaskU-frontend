<template>
    <li class="task-preview">
        <h3>Task Preview:</h3>
        <pre>{{ task }}</pre>
    </li>
</template>

<script>
export default {
    name: "task-preview",
    props: {
        task: Object,
    },
};
</script>

