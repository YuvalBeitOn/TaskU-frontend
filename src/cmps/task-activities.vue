<template>
<section class="task-activities">
    <h1>im Task activities</h1>
    <pre>{{activities}}</pre>
</section>
</template>

<script>
export default {
    name: 'task-activities',
    props: {
        activities: {
            type: Array,
        },
    },
}
</script>

<style>
</style>