<template>
    <section class="user-calender">
        <h1>Hello {{ loggedinUser.fullName }}</h1>
        <h3>THE TASKS: {{ tasks }}</h3>
        <!-- {{ boards }} -->
    </section>
</template>

<script>
//For now the component supports weekly calender only
//ToBeChanged
export default {
    computed: {
        loggedinUser() {
            return this.$store.getters.user
        },
        boards() {
            return this.$store.getters.boards
        },
        tasks() {
            let weeklyTasks = []
            let weeklyTask
            this.boards.forEach((board) => {
                board.groups.filter((group) => {
                    weeklyTask = group.tasks.filter((task) => {
                        return task.txt !== 'txt'
                    })
                    weeklyTasks.push(weeklyTask)
                })
            })
            return weeklyTasks
        },
    },
}
</script>

<style>
</style>