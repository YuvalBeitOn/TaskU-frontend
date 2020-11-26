<template>
    <section class="task-details">
        <h1>This is task details page</h1>
        <h1>{{task}}</h1>
    </section>
</template>

<script>
export default {
    name: 'task-details',
    props: {
        task: {
            type: Object,
        },
    },
    created() {
    },
}
</script>
