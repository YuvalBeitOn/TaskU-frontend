<template>
    <section class="task-details-section">
        <div class="top-bar">
            <i class="fas fa-times"></i>
            <h1>This is task details page</h1>
        </div>
        <!-- <h1>{{ task }}</h1> -->
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
    created() {},
}
</script>
