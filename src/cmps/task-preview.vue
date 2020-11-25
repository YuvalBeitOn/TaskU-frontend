<template>
    <li class="task-preview">
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

